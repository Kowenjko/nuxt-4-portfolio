export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    if (!body.email || !body.name || !body.message) {
      errorHandler(400, 'Missing required fields: name, email, message')
    }

    await sendWelcomeEmail(body)

    return {
      message: 'OK',
    }
  } catch (error) {
    //@ts-ignore
    errorHandler(500, error.message)
  }
})
