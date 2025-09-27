import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
    email: v.string(),
    image: v.string(),
    tokenIdentifier: v.string(),
    isOnline: v.boolean(),
  }).index('by_tokenIdentifier', ['tokenIdentifier']),

  reviews: defineTable({
    user_id: v.id('users'),
    rating: v.union(v.number(), v.null()),
    text: v.string(),
    createdAt: v.number(),
  }).index('by_user_id', ['user_id']),

  views: defineTable({
    user_id: v.union(v.id('users'), v.literal('anonymous')),
    count: v.number(),
  }).index('by_user_id', ['user_id']),
})
