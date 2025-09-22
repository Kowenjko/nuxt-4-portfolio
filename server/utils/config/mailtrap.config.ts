import { MailtrapClient } from 'mailtrap'

const { mailtrapToken } = useRuntimeConfig()

export const mailtrapClient = new MailtrapClient({ token: mailtrapToken })

export const sender = {
  email: 'hello@demomailtrap.com',
  name: 'Kovenko Vasya',
}
