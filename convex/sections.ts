import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const getSections = query(async ({ db }) => {
  return (await db.query('sections').collect()) || []
})

export const getSectionById = query({
  args: { id: v.id('sections') },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id)
  },
})
export const showSectionBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const section = await ctx.db
      .query('sections')
      .withIndex('by_slug', (q) => q.eq('slug', slug))
      .unique()

    return section?.show
  },
})

export const addSections = mutation({
  args: { title: v.string(), slug: v.string() },
  handler: async (ctx, { title, slug }) => {
    const sectionId = await ctx.db.insert('sections', {
      title,
      slug,
      show: true,
    })

    return sectionId
  },
})

export const changeShow = mutation({
  args: { id: v.id('sections'), show: v.boolean() },
  handler: async (ctx, { show, id }) => {
    await ctx.db.patch(id, { show })
  },
})
