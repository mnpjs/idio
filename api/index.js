import { Router } from '@idio/idio'
import { parse } from 'url'
import initRoutes from '@idio/router'

/**
 * Sets the API router, where referer is required in the request.
 * @param {ConfiguredMiddleware} middleware
 * @param {Router} router The main router.
 * @param {string} dir The dir with API routes.
 */
export default async (middleware, router, dir) => {
  const apiRouter = new Router()
  const watchConfig = await initRoutes(apiRouter, dir, {
    middleware,
  })
  router.use('/api/:api_key',
    middleware.cors, middleware.session, middleware.jsonErrors,
    (ctx, next) => {
      const { headers: { referer } } = ctx
      if (!referer) ctx.throw(400, 'Unknown location.')
      const { host, path } = parse(referer)
      ctx.refererHost = host
      ctx.refererPath = path
      ctx.referer = `${host}${path}`
      return next()
    },
    apiRouter.routes(),
  )
  return { apiRouter, watchConfig }
}

/**
 * @typedef {import ('@idio/idio').ConfiguredMiddleware} ConfiguredMiddleware
 */