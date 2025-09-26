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
    user: v.id('users'),
    rating: v.number(),
    text: v.string(),
    createdAt: v.number(),
  }).index('by_user', ['user']),

  views: defineTable({
    count: v.number(),
  }).index('by_count', ['count']),
})
