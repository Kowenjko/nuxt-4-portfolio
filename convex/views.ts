import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const getViews = query(async ({ db }) => {
  const views = await db.query('views').collect()
  return views.reduce((sum, view) => sum + view.count, 0)
})

export const addView = mutation(async ({ db }, { tokenIdentifier }: { tokenIdentifier: string }) => {
  const user = await db
    .query('users')
    .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', tokenIdentifier))
    .unique()

  const row = user
    ? await db
        .query('views')
        .withIndex('by_user_id', (q) => q.eq('user_id', user._id))
        .unique()
    : await db.query('views').first()

  if (!row) {
    await db.insert('views', { user_id: user?._id || 'anonymous', count: 1 })
    return 1
  }

  await db.patch(row._id, { count: row.count + 1 })
  return row.count + 1
})

export const getUsersViews = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query('users').collect()

    const result = []
    for (const user of users) {
      const view = await ctx.db
        .query('views')
        .withIndex('by_user_id', (q) => q.eq('user_id', user._id))
        .unique()

      const reviews = await ctx.db
        .query('reviews')
        .withIndex('by_user_id', (q) => q.eq('user_id', user._id))
        .collect()

      result.push({
        ...user,
        viewsCount: view?.count,
        reviewsCount: reviews.length,
      })
    }

    return result
  },
})

export const getViewsByUserId = query({
  args: { user_id: v.union(v.id('users'), v.literal('anonymous')) },
  handler: async (ctx, { user_id }) => {
    return await ctx.db
      .query('views')
      .withIndex('by_user_id', (q) => q.eq('user_id', user_id))
      .unique()
  },
})
