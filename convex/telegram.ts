import { internalAction } from './_generated/server'
import { v, ConvexError } from 'convex/values'
import { internal } from './_generated/api'

/**
 * Internal Action: Sends a new review notification to a Telegram chat.
 *
 * @param id - The ID of the review to notify about.
 *
 * Behavior:
 *  - Fetches the review from the database.
 *  - If the review exists, formats a message with rating, text, name, and role.
 *  - Sends the message to a Telegram bot with inline buttons for approving or deleting.
 *
 * Note:
 *  - Uses environment variables for Telegram API configuration.
 *  - Supports Markdown formatting for the Telegram message.
 */
export const reviewTelegram = internalAction({
  args: { id: v.id('reviews') },
  handler: async (ctx, { id }) => {
    // Fetch review details
    const review = await ctx.runQuery(internal.reviews.getReviewsById, { id })
    if (!review) return

    // Environment variables for Telegram configuration
    const telegramApi = process.env.TELEGRAM_API!
    const token = process.env.TELEGRAM_BOT_TOKEN!
    const chatId = process.env.TELEGRAM_CHAT_ID!
    const clientUrl = process.env.CLIENT_URL!

    const telegramUrl = `${telegramApi}${token}`

    // Message text formatted for Telegram (Markdown syntax)
    const text = `
📝 *Новий відгук*

⭐ *${review.rating}*

"${review.text}"

👤 *${review.name}* (${review.role})
`

    // Inline buttons for moderation actions
    const buttons = {
      inline_keyboard: [
        [
          { text: '✅ Ухвалити', callback_data: `approve_${id}` },
          { text: '❌ Видалити', callback_data: `remove_${id}` },
        ],
        [{ text: '🔗 Відкрити амін', url: `${clientUrl}/admin/reviews` }],
      ],
    }

    // Send Telegram message (photo sending commented out for now)
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
  },
})

/**
 * Internal Action: Sends a notification to Telegram when a new user account is created.
 *
 * @param email - User's email address.
 * @param name - Optional user's display name.
 *
 * Behavior:
 *  - Sends a formatted message to the configured Telegram chat via bot API.
 *  - Message includes user email and name.
 */
export const createAccountTelegram = internalAction({
  args: { email: v.string(), name: v.optional(v.string()) },
  handler: async (ctx, { email, name }) => {
    // Telegram configuration
    const telegramApi = process.env.TELEGRAM_API!
    const token = process.env.TELEGRAM_BOT_TOKEN!
    const chatId = process.env.TELEGRAM_CHAT_ID!
    const telegramUrl = `${telegramApi}${token}`

    // Message text for new user registration
    const text = `
👥 *Новий користувач*

📧 *${email}*

👤 *${name}*
`

    // Send message to Telegram
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

/**
 * Internal Action: Notifies Telegram when a user's session status changes (online/offline).
 *
 * @param email - User's email.
 * @param name - Optional user's name.
 * @param isOnline - Boolean indicating if the user is currently online.
 *
 * Behavior:
 *  - Formats a message showing user's name, status, and email.
 *  - Sends this message to the Telegram bot chat.
 */
export const sessionAccountTelegram = internalAction({
  args: { email: v.string(), name: v.optional(v.string()), isOnline: v.boolean() },
  handler: async (ctx, { email, name, isOnline }) => {
    // Telegram configuration
    const telegramApi = process.env.TELEGRAM_API!
    const token = process.env.TELEGRAM_BOT_TOKEN!
    const chatId = process.env.TELEGRAM_CHAT_ID!
    const telegramUrl = `${telegramApi}${token}`

    // Message text for user activity (online/offline)
    const text = `
👥 *Активність користувача*

👤 *${name}* 📴 *${isOnline ? 'online' : 'offline'}*

📧 *${email}*
`

    // Send message to Telegram
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
