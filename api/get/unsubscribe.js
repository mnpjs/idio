/**
 * Removes comments' subscription.
 * @type {import('../../').ApiMiddleware}
 */
export default async (ctx) => {
  const { db: { Subscriptions }, refererHost } = ctx
  const { p256dh, method } = ctx.params

  let comments, updates
  if (method == 'comments') comments = false
  else if (method == 'updates') updates = false

  const res = await Subscriptions.updateOne({
    p256dh,
    origin: refererHost,
  }, { $set: {
    ...(comments !== undefined ? { comments } : {}),
    ...(updates !== undefined ? { updates } : {}),
  } })
  if (res.modifiedCount)
    ctx.body = { comments, updates }
  else ctx.body = {}
}

export const route = '/unsubscribe/:p256dh/:method'