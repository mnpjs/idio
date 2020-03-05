import idio, { Router, render } from '@idio/idio'
import { sync } from 'uid-safe'
import initRoutes, { watchRoutes } from '@idio/router'
import linkedIn, { getUser } from '@idio/linkedin'
import model from './model'
import makeApiRouter from '../api'
import DefaultLayout from '../layout'

const {
  NODE_ENV,
  HOST = 'https://{{ name }}',
  FRONT_END = 'https://{{ frontend }}',
  CLOSURE, // for /comments page
  SESSION_KEY,
  GITHUB_ADMIN,
} = process.env
const PROD = NODE_ENV == 'production'

/**
 * Starts the server.
 * @param {Object} p
 * @param {import('mongodb').MongoClient} p.Mongo
 */
export default async function Server({
  client, port, client_id, client_secret, appName,
  watch = !PROD, elastic, Mongo, github_id, github_secret,
}) {
  const { app, url, middleware, router } = await idio({
    logarithm: { app, url: elastic, use: true },
    compress: true,
    cors: {
      origin: PROD && [FRONT_END, HOST, 'http://localhost:3000'],
      credentials: true,
    },
    form: { dest: 'upload' },
    frontend: { use: !PROD },
    static: { use: PROD || CLOSURE, root: 'docs' },
    session: { keys: [SESSION_KEY] },
    forms: {
      middlewareConstructor() {
        return async (ctx, next) => {
          const f = middleware.form.any()
          await f(ctx, next)
        }
      },
    },
    github: {
      client_id: github_id,
      client_secret: github_secret,
      path: '/github',
      error(ctx, error, desc) {
        console.log('Github error %s %s', error, desc)
        ctx.redirect(`/callback?error=${error}`)
      },
      async finish(ctx, token, scope, user) {
        ctx.session.github_token = token
        if (user.login == GITHUB_ADMIN) {
          ctx.session.admin = true
        }
        ctx.session.github_user = {
          login: user.login,
          name: user.name,
          avatar_url: user.avatar_url,
          html_url: user.html_url,
        }
        if (!ctx.session.csrf) ctx.session.csrf = sync(18)
        await ctx.session.manuallyCommit()
        ctx.redirect('/callback')
      },
    },
    csrfCheck: {},
    jsonErrors: {},
  }, { port })
  Object.assign(app.context, {
    ...model(Mongo),
    prod: PROD,
    HOST: PROD ? HOST : url,
    STATIC: PROD ? 'https://{{ static }}' : url,
    CLOSURE: PROD || CLOSURE,
    client, appName,
    render: (vnode, props = {}, Layout = DefaultLayout) => {
      return render(<Layout {...props}>
        {vnode}
      </Layout>, {
        addDoctype: true,
        pretty: true,
      })
    },
  })

  if (CLOSURE)
    console.log('Testing Closure bundle: %s', 'docs/comments.js')
  linkedIn(router, {
    session: middleware.session,
    client_id,
    client_secret,
    scope: 'r_liteprofile',
    error(ctx, error) {
      console.log('Linkedin error %s', error)
      ctx.redirect(`/callback?error=${error}`)
    },
    path: '/linkedin',
    async finish(ctx, token, user) {
      ctx.session.linkedin_token = token
      ctx.session.linkedin_user = getUser(user)
      if (!ctx.session.csrf) ctx.session.csrf = sync(18)
      ctx.redirect('/callback')
    },
  })
  // MAIN ROUTES
  const w = await initRoutes(router, 'routes', {
    middleware,
  })
  // API ROUTES
  const { watchConfig: w2 } = await makeApiRouter(middleware, router, 'api')

  // ADMIN ROUTES
  const adminRouter = new Router()
  const w3 = await initRoutes(adminRouter, 'admin', {
    middleware,
  })

  if (watch) [w, w2, w3].forEach(watchRoutes)

  router.use('/admin',
    middleware.cors, middleware.session, middleware.jsonErrors, (ctx, next) => {
      if (!ctx.session.admin) ctx.throw(403)
      return next()
    },
    adminRouter.routes()
  )
  app.use(router.routes())
  // app.use(ctx => ctx.redirect(FRONT_END))
  return { app, url }
}