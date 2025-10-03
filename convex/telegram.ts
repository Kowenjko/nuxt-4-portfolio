import { internalAction } from './_generated/server'
import { v, ConvexError } from 'convex/values'
import { internal } from './_generated/api'

export const reviewTelegram = internalAction({
  args: { id: v.id('reviews') },
  handler: async (ctx, { id }) => {
    const review = await ctx.runQuery(internal.reviews.getReviewsById, { id })

    if (!review) return

    const telegramApi = process.env.TELEGRAM_API!
    const token = process.env.TELEGRAM_BOT_TOKEN!
    const chatId = process.env.TELEGRAM_CHAT_ID!
    const clientUrl = process.env.CLIENT_URL!

    const telegramUrl = `${telegramApi}${token}`

    const text = `
📝 *Новий відгук*

⭐ *${review.rating}*

"${review.text}"

👤 *${review.name}* (${review.role})
`

    const buttons = {
      inline_keyboard: [
        [
          { text: '✅ Ухвалити', callback_data: `approve_${id}` },
          { text: '❌ Видалити', callback_data: `remove_${id}` },
        ],
        [{ text: '🔗 Відкрити амін', url: `${clientUrl}/admin/reviews` }],
      ],
    }

    // if (review.avatar) {
    //   await fetch(`${telegramUrl}/sendPhoto`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       chat_id: chatId,
    //       photo: review.avatar,
    //       caption: text,
    //       parse_mode: 'Markdown',
    //       reply_markup: buttons,
    //     }),
    //   })
    // } else {
    await fetch(`${telegramUrl}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
        reply_markup: buttons,
      }),
    })
    // }
  },
})

export const createAccountTelegram = internalAction({
  args: { email: v.string(), name: v.optional(v.string()) },
  handler: async (ctx, { email, name }) => {
    const telegramApi = process.env.TELEGRAM_API!
    const token = process.env.TELEGRAM_BOT_TOKEN!
    const chatId = process.env.TELEGRAM_CHAT_ID!

    const telegramUrl = `${telegramApi}${token}`

    const text = `
👥 *Новий користувач*

📧 *${email}*

👤 *${name}* 
`

    await fetch(`${telegramUrl}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    })
  },
})
export const sessionAccountTelegram = internalAction({
  args: { email: v.string(), name: v.optional(v.string()), isOnline: v.boolean() },
  handler: async (ctx, { email, name, isOnline }) => {
    const telegramApi = process.env.TELEGRAM_API!
    const token = process.env.TELEGRAM_BOT_TOKEN!
    const chatId = process.env.TELEGRAM_CHAT_ID!

    const telegramUrl = `${telegramApi}${token}`

    const text = `
👥 *Активність користувача*

👤 *${name}* 📴 *${isOnline ? 'online' : 'offline'}*

📧 *${email}*

`

    await fetch(`${telegramUrl}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    })
  },
})
