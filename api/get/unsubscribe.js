/**
 * Removes comments' subscription.
 * @type {import('../../').Middleware}
 */
export default async (ctx) => {
  const { query: { comments, lambda }, mongo } = ctx
  const { p256dh } = ctx.params

  if (comments) {
    const subscriptions = mongo.collection('Subscriptions')
    const res = await subscriptions.updateOne({ p256dh }, { $set: {
      comments: false,
    } })
    ctx.body = { comments: false }
    return
  } else if (lambda) {
    const subscriptions = mongo.collection('LambdaSubscriptions')
    const res = await subscriptions.deleteOne({ p256dh })
    ctx.body = { comments: false }
    return
  }
  ctx.body = {}
}

export const alises = ['/unsubscribe/:p256dh']