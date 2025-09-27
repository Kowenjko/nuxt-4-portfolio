// import { SendMessage } from '~~/shared/types'
import { mailtrapClient, sender } from './config'

export const sendWelcomeEmail = async ({ email, name, message }: SendMessageI) => {
  const { mailtrapTemplate, mailtrapRecipient } = useRuntimeConfig()

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: [{ email: mailtrapRecipient }],
      template_uuid: mailtrapTemplate,
      template_variables: { name, email, message },
    })

    console.log('Welcome email sent successfully', response)
  } catch (error) {
    console.error(`Error sending welcome email`, error)

    throw new Error(`Error sending welcome email: ${error}`)
  }
}
