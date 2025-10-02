import { internalAction } from './_generated/server'
import { v, ConvexError } from 'convex/values'
import { internal } from './_generated/api'

const TELEGRAM_API = 'https://api.telegram.org'

export const notifyTelegram = internalAction({
  args: { id: v.id('reviews') },
  handler: async (ctx, { id }) => {
    const review = await ctx.runQuery(internal.reviews.getReviewsById, { id })

    console.log('review=', review)

    if (!review) return

    const token = process.env.NUXT_TELEGRAM_BOT_TOKEN!
    const chatId = process.env.NUXT_TELEGRAM_ADMIN_ID!

    const text = `📝 Новый отзыв:\n\n"${review.text}"\n\n👤 ${review.name} (${review.role})`

    const buttons = {
      inline_keyboard: [
        [
          { text: '✅ Одобрить', callback_data: `approve_${id}` },
          { text: '❌ Удалить', callback_data: `remove_${id}` },
        ],
      ],
    }

    await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        reply_markup: buttons,
      }),
    })
  },
})
