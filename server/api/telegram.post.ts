export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { telegramUrl } = useRuntimeConfig(event)

  try {
    if (!body.email || !body.name || !body.message) {
      errorHandler(400, 'Missing required fields: name, email, message')
    }

    await $fetch(telegramUrl, {
      method: 'POST',
      body: body,
      redirect: 'follow',
    })

    return {
      message: 'OK',
    }
  } catch (error) {
    //@ts-ignore
    errorHandler(500, error.message)
  }
})
