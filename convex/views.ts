import { mutation, query, internalMutation } from './_generated/server'
import { v } from 'convex/values'
import { internal } from './_generated/api'

/**
 * Query: Get the total number of views from the "views" table.
 * It sums up all `count` fields from every record in the "views" table.
 */
export const getViews = query(async ({ db }) => {
  const views = await db.query('views').collect()
  return views.reduce((sum, view) => sum + view.count, 0)
})

/**
 * Internal Mutation: Adds a new view or increments the existing view count for a specific user.
 *
 * @param tokenIdentifier - Optional user token used to find the corresponding user record.
 *
 * If a user exists with the given token:
 *  - Finds their "views" record by user ID and increments it.
 * If no record exists:
 *  - Creates a new one with count = 1.
 *
 * If no tokenIdentifier is provided:
 *  - Treats the user as "anonymous".
 */
export const baseAddView = internalMutation(async ({ db }, { tokenIdentifier }: { tokenIdentifier: string | null }) => {
  let user: any = null

  // Find the user by tokenIdentifier if provided
  if (tokenIdentifier)
    user = await db
      .query('users')
      .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', tokenIdentifier))
      .unique()

  // Get the user's view record (or the anonymous record if no user)
  const row = user
    ? await db
        .query('views')
        .withIndex('by_user_id', (q) => q.eq('user_id', user._id))
        .unique()
    : await db.query('views').first()

  // If no record exists, create a new one with count = 1
  if (!row) {
    await db.insert('views', { user_id: user?._id || 'anonymous', count: 1 })
    return
  }

  // Increment existing view count
  await db.patch(row._id, { count: row.count + 1 })
  return row.count + 1
})

/**
 * Public Mutation: Adds a view for a given user.
 *
 * This mutation simply calls the internal `baseAddView` mutation.
 * It allows client-side access to increment the view count.
 */
export const addView = mutation({
  args: { tokenIdentifier: v.union(v.string(), v.null()) },
  handler: async (ctx, args) => {
    await ctx.runMutation(internal.views.baseAddView, { tokenIdentifier: args.tokenIdentifier })
  },
})

/**
 * Query: Returns a list of all users along with their view and review counts.
 *
 * For each user:
 *  - Retrieves the user's "views" record.
 *  - Retrieves all "reviews" associated with that user.
 *  - Returns combined data with counts.
 */
export const getUsersViews = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query('users').collect()

    const result = []
    for (const user of users) {
      // Get view record by user ID
      const view = await ctx.db
        .query('views')
        .withIndex('by_user_id', (q) => q.eq('user_id', user._id))
        .unique()

      // Get all reviews by user ID
      const reviews = await ctx.db
        .query('reviews')
        .withIndex('by_user_id', (q) => q.eq('user_id', user._id))
        .collect()

      // Combine user info with view and review counts
      result.push({
        ...user,
        viewsCount: view?.count,
        reviewsCount: reviews.length,
      })
    }

    return result
  },
})

/**
 * Query: Get the "views" record by a specific user ID.
 *
 * @param user_id - The ID of the user or the literal value "anonymous".
 *
 * Returns the corresponding "views" entry if it exists.
 */
export const getViewsByUserId = query({
  args: { user_id: v.union(v.id('users'), v.literal('anonymous')) },
  handler: async (ctx, { user_id }) => {
    return await ctx.db
      .query('views')
      .withIndex('by_user_id', (q) => q.eq('user_id', user_id))
      .unique()
  },
})
