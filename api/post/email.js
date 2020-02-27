/**
 * Creates an email subscription.
 * @type {import('../..').ApiMiddleware}
 */
export default async (ctx) => {
  const { linkedin_user, github_user } = ctx.session
  if (!(linkedin_user || github_user)) ctx.throw(401)

  const { db: {
    Emails,
  }, request: { body: { email } }, referer, refererHost } = ctx
  if (!email) ctx.throw(400, 'No email address received.')

  const verified = []
  if (linkedin_user && linkedin_user.email) verified.push(linkedin_user.email)
  if (github_user && github_user.emails) {
    const ghe = github_user.emails
      .filter(({ verified: v }) => v)
      .map(({ email: e }) => e)
    verified.push(...ghe)
  }
  if (!verified.includes(email)) {
    ctx.throw(400, 'Unknown e-mail address')
  }

  const { api_key, project = referer } = ctx.params

  const $or = []
  if (linkedin_user) $or.push({ linkedin_id: linkedin_user.id })
  if (github_user) $or.push({ github_login: github_user.login })

  const id = {
    ...(linkedin_user ? { linkedin_id: linkedin_user.id } : {}),
    ...(github_user ? { github_login: github_user.login } : {}),
  }

  /**
   * @type {_akashic.Email}
   */
  const newEmail = {
    email,
    referer,
    origin: refererHost,
    date: new Date(),
    ...id,
  }
  const { modifiedCount, upsertedCount } = await Emails.updateOne({
    api_key,
    project,
    $or,
  }, {
    $set: newEmail,
  }, { upsert: true })
  ctx.body = { modified: !!modifiedCount, added: !!upsertedCount }
}

export const aliases = ['/email/:project']
export const middleware = ['forms', 'csrfCheck']

/**
 * @typedef {import('../../').Auth} Auth
 * @typedef {import('../../').Email} _akashic.Email
 */