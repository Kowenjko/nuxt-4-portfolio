import { ConvexError, v } from 'convex/values'
import { internalMutation, query } from './_generated/server'
import { internal } from './_generated/api'

/**
 * Internal Mutation: Creates a new user in the "users" table.
 *
 * @param tokenIdentifier - A unique identifier for the user (e.g., from auth provider).
 * @param email - User's email address.
 * @param name - User's full name.
 * @param image - URL of the user's avatar image.
 *
 * After creating a user:
 *  - Triggers Telegram account creation via `internal.telegram.createAccountTelegram`.
 *  - Calls `baseAddView` to initialize a view count for the user.
 */
export const createUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    email: v.string(),
    name: v.string(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    // Insert new user into the database
    await ctx.db.insert('users', {
      tokenIdentifier: args.tokenIdentifier,
      email: args.email,
      name: args.name,
      avatar: args.image,
      isOnline: true,
    })

    // Schedule a Telegram account creation task
    await ctx.scheduler.runAfter(0, internal.telegram.createAccountTelegram, {
      email: args.email,
      name: args.name,
    })

    // Initialize user's view record
    await ctx.runMutation(internal.views.baseAddView, { tokenIdentifier: args.tokenIdentifier })
  },
})

/**
 * Internal Mutation: Updates a user's avatar.
 *
 * @param tokenIdentifier - The user's unique token identifier.
 * @param avatar - The new avatar image URL.
 *
 * Throws:
 *  - ConvexError if the user cannot be found.
 */
export const updateUser = internalMutation({
  args: { tokenIdentifier: v.string(), avatar: v.string() },
  async handler(ctx, args) {
    // Find the user by tokenIdentifier
    const user = await ctx.db
      .query('users')
      .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', args.tokenIdentifier))
      .unique()

    if (!user) {
      throw new ConvexError('User not found')
    }

    // Update the user's avatar
    await ctx.db.patch(user._id, {
      avatar: args.avatar,
    })
  },
})

/**
 * Internal Mutation: Sets a user as online and updates their Telegram session.
 *
 * @param tokenIdentifier - The user's unique token identifier.
 *
 * Throws:
 *  - ConvexError if the user cannot be found.
 */
export const setUserOnline = internalMutation({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    // Find the user by tokenIdentifier
    const user = await ctx.db
      .query('users')
      .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', args.tokenIdentifier))
      .unique()

    if (!user) {
      throw new ConvexError('User not found')
    }

    // Update the user to online
    await ctx.db.patch(user._id, { isOnline: true })

    // Notify Telegram service about session change
    await ctx.scheduler.runAfter(0, internal.telegram.sessionAccountTelegram, {
      email: user.email,
      name: user.name,
      isOnline: user.isOnline || true,
    })
  },
})

/**
 * Internal Mutation: Sets a user as offline and updates their Telegram session.
 *
 * @param tokenIdentifier - The user's unique token identifier.
 *
 * Throws:
 *  - ConvexError if the user cannot be found.
 */
export const setUserOffline = internalMutation({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    // Find the user by tokenIdentifier
    const user = await ctx.db
      .query('users')
      .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', args.tokenIdentifier))
      .unique()

    if (!user) {
      throw new ConvexError('User not found')
    }

    // Update the user to offline
    await ctx.db.patch(user._id, { isOnline: false })

    // Notify Telegram service about session change
    await ctx.scheduler.runAfter(0, internal.telegram.sessionAccountTelegram, {
      email: user.email,
      name: user.name,
      isOnline: !user.isOnline || false,
    })
  },
})

/**
 * Query: Fetches all users except the currently authenticated one.
 *
 * @param tokenIdentifier - The token of the current user, used to exclude them from results.
 *
 * Throws:
 *  - ConvexError if `tokenIdentifier` is missing.
 *
 * Returns:
 *  - Array of user objects excluding the current user.
 */
export const getUsers = query({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    if (!args.tokenIdentifier) {
      throw new ConvexError('Unauthorized')
    }

    // Fetch all users and exclude the current one
    const users = await ctx.db.query('users').collect()
    return users.filter((user) => user.tokenIdentifier !== args.tokenIdentifier)
  },
})
