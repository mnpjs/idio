import webpush from 'web-push'
import { findKeys } from '../get/vapid'

const ICON = 'https://{{ static }}/icon.jpg'

/**
 * Subscribes to web-push comments and updates.
 * Only need to remember scope when subscribing.
 * @type {import('../..').ApiMiddleware}
 */
export default async (ctx) => {
  const { db: { Subscriptions }, refererPath } = ctx
  let { body: { endpoint, auth, scope = '' } = {} } = ctx.request
  if (!scope.startsWith('/')) scope = `/${scope}`
  if (scope.endsWith('/')) scope = scope.replace(/\/$/, '')
  if (!endpoint) throw new Error('!Missing subscription endpoint.')
  if (!auth) throw new Error('!Missing subscription auth key.')

  if (!refererPath.startsWith(scope))
    ctx.throw(400, 'Location does not match scope.')

  const { p256dh, method, api_key } = ctx.params

  let comments, updates
  if (method == 'comments') comments = true
  else if (method == 'updates') updates = true

  const { public_vapid, private_vapid, origin, icon = ICON } = await findKeys(ctx)
  const url = `https://${origin}`

  const { statusCode } = await webpush.sendNotification({
    endpoint,
    keys: { auth, p256dh },
  }, JSON.stringify({
    url,
    title: 'Hello', body: `Subscribed to ${comments ? 'comments' : 'updates'}.`,
    icon,
  }), {
    vapidDetails: {
      subject: url,
      privateKey: private_vapid,
      publicKey: public_vapid,
    },
  })

  if (statusCode != 201) throw new Error('!Invalid web-push status code.')

  /** @type {_akashic.Subscription} */
  const subscription = {
    api_key,
    auth,
    origin,
    ...(comments !== undefined ? { comments } : {}),
    ...(updates !== undefined ? { updates } : {}),
    p256dh,
    endpoint,
    date: new Date(),
  }
  await Subscriptions.updateMany({
    api_key,
    p256dh,
    origin,
    scope,
  }, { $set: subscription }, { upsert: true })

  /** @type {_akashic.Subscription} */
  const sub = { comments, updates }
  ctx.body = sub
}

export const aliases = ['/subscribe/:p256dh/:method']
export const middleware = ['forms']

/**
 * @typedef {import('../../').Auth} Auth
 * @typedef {import('../../').Subscription} _akashic.Subscription
 */
