/**
 * Returns whether there's a subscription to comments based on the key.
 * @type {import('../../').Middleware}
 */
export default async (ctx) => {
  const { mongo } = ctx
  const { p256dh } = ctx.params
  const subscriptions = mongo.collection('Subscriptions')

  const res = await subscriptions.findOne({
    p256dh,
  })
  if (!res) return ctx.body = {}
  ctx.body = { comments: res.comments }
}

export const aliases = ['/subscriptions/:p256dh']