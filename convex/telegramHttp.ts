import { httpAction } from './_generated/server'

export const webhook = httpAction(async (ctx, req) => {
  const body = await req.json()

  console.log('body=', body)

  // if (!body.callback_query) return new Response('ok')

  // const data = body.callback_query.data
  // const id = data.split('_')[1] as any

  // console.log('id', id)

  // if (data.startsWith('approve_')) {
  //   await ctx.db.patch(id, { approved: true })
  //   return new Response('approved')
  // }

  // if (data.startsWith('remove_')) {
  //   await ctx.db.delete(id)
  //   return new Response('removed')
  // }

  return new Response(null, {
    status: 200,
  })
})
