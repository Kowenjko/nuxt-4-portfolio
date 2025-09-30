import { v, ConvexError } from 'convex/values'
import { mutation, query, internalQuery } from './_generated/server'
import { internal } from './_generated/api'

export const getReviews = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db
      .query('reviews')
      .filter((q) => q.eq(q.field('approved'), true))
      .order('desc')
      .collect()
  },
})

export const getReviewsById = internalQuery({
  args: { id: v.id('reviews') },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id)
  },
})

export const getAllReviews = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db.query('reviews').order('desc').collect()
  },
})

export const changeApproveReview = mutation({
  args: { id: v.id('reviews'), approved: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { approved: args.approved })
  },
})

export const addReview = mutation({
  args: {
    text: v.string(),
    role: v.string(),
    rating: v.number(),
    tokenIdentifier: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', args.tokenIdentifier))
      .unique()

    if (!user) {
      throw new ConvexError('User not found')
    }

    const reviewId = await ctx.db.insert('reviews', {
      text: args.text,
      role: args.role,
      rating: args.rating,
      user_id: user._id,
      name: user.name || 'Anonymous',
      avatar: user.avatar,
      approved: false,
      createdAt: Date.now(),
    })

    await ctx.scheduler.runAfter(0, internal.actions.notifyTelegram, { id: reviewId })

    return reviewId
  },
})

export const deleteReview = mutation({
  args: {
    id: v.id('reviews'),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
    return { success: true }
  },
})
