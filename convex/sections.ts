import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

/**
 * Query: Retrieves all sections from the "sections" table.
 *
 * @returns {Promise<Array>} - Returns an array of section objects, or an empty array if none exist.
 */
export const getSections = query(async ({ db }) => {
  return (await db.query('sections').collect()) || []
})

/**
 * Query: Retrieves a section by its unique ID.
 *
 * @param id - The ID of the section to retrieve.
 * @returns {Promise<Object|null>} - The section object if found, otherwise null.
 */
export const getSectionById = query({
  args: { id: v.id('sections') },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id)
  },
})

/**
 * Query: Determines whether a section (found by its slug) should be displayed.
 *
 * @param slug - The slug string used to find the section.
 * @returns {Promise<boolean|undefined>} - Returns the `show` flag of the section, or undefined if not found.
 */
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

/**
 * Mutation: Creates a new section in the database.
 *
 * @param title - The display name of the section.
 * @param slug - The unique slug (URL-friendly identifier) for the section.
 *
 * @returns {Promise<string>} - The ID of the newly created section.
 */
export const addSections = mutation({
  args: { title: v.string(), slug: v.string() },
  handler: async (ctx, { title, slug }) => {
    const sectionId = await ctx.db.insert('sections', {
      title,
      slug,
      show: true, // Sections are visible by default
    })

    return sectionId
  },
})

/**
 * Mutation: Updates the visibility (`show`) status of a section.
 *
 * @param id - The ID of the section to update.
 * @param show - Boolean indicating whether the section should be visible or hidden.
 *
 * @returns {Promise<void>}
 */
export const changeShow = mutation({
  args: { id: v.id('sections'), show: v.boolean() },
  handler: async (ctx, { show, id }) => {
    await ctx.db.patch(id, { show })
  },
})
