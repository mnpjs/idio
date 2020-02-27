import idio, { Router, render } from '@idio/idio'
import { sync } from 'uid-safe'
import initRoutes, { watchRoutes } from '@idio/router'
import linkedIn, { getUser } from '@idio/linkedin'
import logarithm from 'logarithm'
import DefaultLayout from '../layout'

const {
  NODE_ENV,
  HOST = 'https://{{ name }}',
  FRONT_END = 'https://{{ frontend }}',
  CLOSURE, // for /comments page
  SESSION_KEY,
} = process.env
const PROD = NODE_ENV == 'production'

/**
 * Starts the server.
 */
export default async function Server({
  client, port, client_id, client_secret, appName,
  watch = !PROD, elastic, Mongo, github_id, github_secret,
}) {
  const { app, url, middleware, router } = await idio({
    cors: {
      use: true,
      origin: PROD && [FRONT_END, HOST, 'http://localhost:3000'],
      credentials: true,
    },
    compress: { use: true },
    logarithm: {
      middlewareConstructor() {
        const l = logarithm({
          app: appName,
          url: elastic,
        })
        return l
      },
      use: true,
    },
    form: {
      dest: 'upload',
    },
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
    mongo: Mongo.db(),
    prod: PROD,
    HOST: PROD ? HOST : url,
    STATIC: PROD ? '{{ static }}' : url,
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
  const w = await initRoutes(router, 'routes', {
    middleware,
  })
  const apiRouter = new Router()
  const w2 = await initRoutes(apiRouter, 'api', {
    middleware,
  })
  if (watch) {
    watchRoutes(w)
    watchRoutes(w2)
  }
  router.use('/api',
    middleware.cors, middleware.session, middleware.jsonErrors,
    apiRouter.routes()
  )
  app.use(router.routes())
  // app.use(ctx => ctx.redirect(FRONT_END))
  return { app, url }
}