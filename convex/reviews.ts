import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getReviews = query({
  args: {},
  handler: async (ctx, args) => {
    const reviews = await ctx.db.query('reviews').collect()
    return reviews
  },
})

export const addReview = mutation({
  args: {
    author: v.string(),
    text: v.string(),
    rating: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const reviewId = await ctx.db.insert('reviews', {
      user: args.author,
      text: args.text,
      rating: args.rating ?? null,
      createdAt: Date.now(),
    })
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
