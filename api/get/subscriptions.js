/**
 * Returns whether there's a subscription to comments based on the key.
 * @type {import('../../').ApiMiddleware}
 */
export default async (ctx) => {
  const { db: { Subscriptions }, refererHost, refererPath } = ctx
  let { p256dh, scope = '', api_key } = ctx.params
  scope = `/${scope}`

  if (!refererPath.startsWith(scope))
    ctx.throw(400, 'Location does not match scope.')

  const res = /** @type {Subscription} */ (await Subscriptions.findOne({
    api_key,
    origin: refererHost,
    scope,
    p256dh,
  }, {
    projection: { comments: 1, updates: 1, _id: 0 },
  }))
  if (!res) return ctx.body = {}
  ctx.body = { comments: !!res.comments, updates: !!res.updates }
}

export const route = '/subscriptions/:p256dh/:scope?'

/**
 * @typedef {import('../..').Subscription} Subscription
 */