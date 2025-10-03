import { ConvexError, v } from 'convex/values'
import { internalMutation, query } from './_generated/server'
import { internal } from './_generated/api'

export const createUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    email: v.string(),
    name: v.string(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('users', {
      tokenIdentifier: args.tokenIdentifier,
      email: args.email,
      name: args.name,
      avatar: args.image,
      isOnline: true,
    })

    await ctx.scheduler.runAfter(0, internal.telegram.createAccountTelegram, {
      email: args.email,
      name: args.name,
    })
  },
})

export const updateUser = internalMutation({
  args: { tokenIdentifier: v.string(), avatar: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query('users')
      .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', args.tokenIdentifier))
      .unique()

    if (!user) {
      throw new ConvexError('User not found')
    }

    https: await ctx.db.patch(user._id, {
      avatar: args.avatar,
    })
  },
})

export const setUserOnline = internalMutation({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', args.tokenIdentifier))
      .unique()

    if (!user) {
      throw new ConvexError('User not found')
    }

    await ctx.db.patch(user._id, { isOnline: true })

    await ctx.scheduler.runAfter(0, internal.telegram.sessionAccountTelegram, {
      email: user.email,
      name: user.name,
      isOnline: !user.isOnline,
    })
  },
})

export const setUserOffline = internalMutation({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', args.tokenIdentifier))
      .unique()

    if (!user) {
      throw new ConvexError('User not found')
    }

    await ctx.db.patch(user._id, { isOnline: false })

    await ctx.scheduler.runAfter(0, internal.telegram.sessionAccountTelegram, {
      email: user.email,
      name: user.name,
      isOnline: !user.isOnline,
    })
  },
})

export const getUsers = query({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    if (!args.tokenIdentifier) {
      throw new ConvexError('Unauthorized')
    }
    const users = await ctx.db.query('users').collect()
    return users.filter((user) => user.tokenIdentifier !== args.tokenIdentifier)
  },
})
