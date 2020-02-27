/**
 * Returns the VAPID key for the given origin and scope.
 * @type {import('../../').Middleware}
 */
export default async (ctx) => {
  const keys = await findKeys(ctx)
  const { public_vapid } = keys
  ctx.body = { public_vapid }
}

/**
 * @param {import('../..').ApiContext} ctx
 * @return {{ public_vapid: string, private_vapid: string, origin: string }}
 */
export const findKeys = async (ctx) => {
  const { refererHost: origin, db: {
    Vapid,
  } } = ctx
  let { api_key, scope = '' } = ctx.params
  scope = `/${scope}`

  const keys = await Vapid.findOne({
    scope,
    api_key,
    origin,
  })
  if (!keys) return {
    public_vapid: process.env.PUBLIC_VAPID,
    private_vapid: process.env.PRIVATE_VAPID,
    origin,
  }
  // throw new Error(`!Vapid keys are not set for ${origin}.`)
  return keys
}

export const route = '/vapid/:scope?'