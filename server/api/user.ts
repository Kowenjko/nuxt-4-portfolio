export default defineEventHandler(async (event) => {
  // Use `auth` to get the user's ID
  const { isAuthenticated, userId } = event.context.auth()

  if (!isAuthenticated) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: No user ID provided',
    })
  }

  return { userId }
})
