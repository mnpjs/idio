/**
 * Unsubscribe from email newsletters.
 * @type {import('../..').ApiMiddleware}
 */
export default async (ctx) => {
  const { linkedin_user, github_user } = ctx.session
  if (!(linkedin_user || github_user)) ctx.throw(401)

  const { db: { Emails }, request: { body: { email } }, referer } = ctx
  if (!email) ctx.throw(400, 'No email address received.')

  const { api_key, project = referer } = ctx.params

  const $or = []
  if (linkedin_user) $or.push({ linkedin_id: linkedin_user.id })
  if (github_user) $or.push({ github_login: github_user.login })

  const { deletedCount } = await Emails.deleteOne({ $or, api_key, project, email })
  ctx.body = { deleted: !!deletedCount }
}

export const route = '/unsubscribe/:project'
export const middleware = ['forms', 'csrfCheck']

/**
 * @typedef {import('../../').Auth} Auth
 */