import { v, ConvexError } from 'convex/values'
import { mutation, query, internalQuery } from './_generated/server'
import { internal } from './_generated/api'

/**
 * Query: Retrieves all approved reviews.
 *
 * Behavior:
 *  - Fetches all records from the "reviews" table.
 *  - Filters only those where `approved` is true.
 *  - Orders results in descending order (most recent first).
 *
 * @returns {Promise<Array>} - List of approved review objects.
 */
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

/**
 * Internal Query: Retrieves a single review by its ID.
 *
 * @param id - The ID of the review to retrieve.
 *
 * @returns {Promise<Object|null>} - The review object if found, otherwise null.
 *
 * Note: This query is marked as `internal`, meaning it can only be called by other
 * server functions or scheduled actions, not directly from the client.
 */
export const getReviewsById = internalQuery({
  args: { id: v.id('reviews') },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id)
  },
})

/**
 * Query: Retrieves all reviews (approved and unapproved).
 *
 * Behavior:
 *  - Fetches all records from the "reviews" table.
 *  - Orders results in descending order by creation time.
 *
 * @returns {Promise<Array>} - List of all review objects.
 */
export const getAllReviews = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db.query('reviews').order('desc').collect()
  },
})

/**
 * Mutation: Updates the approval status of a review.
 *
 * @param id - The ID of the review to update.
 * @param approved - Boolean value indicating whether the review is approved or not.
 *
 * @returns {Promise<void>}
 */
export const changeApproveReview = mutation({
  args: { id: v.id('reviews'), approved: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { approved: args.approved })
  },
})

/**
 * Mutation: Adds a new review associated with a user.
 *
 * @param text - The content of the review.
 * @param role - The reviewer's role or title.
 * @param rating - Numeric rating score (e.g., 1–5).
 * @param tokenIdentifier - The user's unique authentication token.
 *
 * Behavior:
 *  - Finds the user by `tokenIdentifier`.
 *  - If the user exists, inserts a new review record linked to that user.
 *  - Sets `approved` to false by default.
 *  - Schedules a Telegram notification to be sent to admins.
 *
 * Throws:
 *  - ConvexError if the user cannot be found.
 *
 * @returns {Promise<string|Object>} - The new review ID if created, otherwise an error message.
 */
export const addReview = mutation({
  args: {
    text: v.string(),
    role: v.string(),
    rating: v.number(),
    tokenIdentifier: v.string(),
  },
  handler: async (ctx, args) => {
    // Find user by tokenIdentifier
    const user = await ctx.db
      .query('users')
      .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', args.tokenIdentifier))
      .unique()

    if (!user) {
      throw new ConvexError('User not found')
    }

    // Prepare review data
    const formData = {
      text: args.text,
      role: args.role,
      rating: args.rating,
      user_id: user._id,
      name: user.name || 'Anonymous',
      avatar: user.avatar,
    }

    // Insert review into database
    const reviewId = await ctx.db.insert('reviews', {
      ...formData,
      approved: false,
      createdAt: Date.now(),
    })

    // Notify admins via Telegram
    if (reviewId) {
      await ctx.scheduler.runAfter(0, internal.telegram.reviewTelegram, { id: reviewId })
      return reviewId
    }

    return { message: 'Error creating review' }
  },
})

/**
 * Mutation: Deletes a review by its ID.
 *
 * @param id - The ID of the review to delete.
 *
 * @returns {Promise<{ success: boolean }>} - Confirmation of successful deletion.
 */
export const deleteReview = mutation({
  args: {
    id: v.id('reviews'),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
    return { success: true }
  },
})
