import { mutation, query } from './_generated/server'

export const getViews = query(async ({ db }) => {
  const row = await db.query('views').first()
  return row?.count ?? 0
})

export const addView = mutation(async ({ db }) => {
  const row = await db.query('views').first()

  if (!row) {
    await db.insert('views', { count: 1 })
    return 1
  }

  await db.patch(row._id, { count: row.count + 1 })
  return row.count + 1
})
