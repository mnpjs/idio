import { ObjectID } from 'mongodb'

/**
 * Removes a comment from the database.
 * @type {import('../../').Middleware}
 */
export default async (ctx) => {
  const { linkedin_user, github_user } = ctx.session

  const { id } = ctx.request.query

  if (!id) throw new Error('!Comment ID is missing.')

  const Comments = ctx.mongo.collection('comments')
  const oid = new ObjectID(id)
  const f = await Comments.findOneAndUpdate({
    _id: oid,
  }, { $set: { removed: true } })
  const { value: found } = f

  if (!found) throw new Error('!Comment not found.')

  let isAuthor = false
  if (linkedin_user && found.linkedin_user && linkedin_user.id == found.linkedin_user.id) {
    isAuthor = true
  } else if (github_user && found.github_user && github_user.html_url == found.github_user.html_url) {
    isAuthor = true
  }
  if (!isAuthor) throw new Error('!You\'re not the author of this comment.')
  // ban

  const { replyTo } = found
  if (replyTo) await Comments.findOneAndUpdate({ _id: ObjectID(replyTo) }, {
    $inc: {
      replies: -1,
    },
  })

  ctx.body = { ok: f.ok }

  // const { linkedin_user, github_user, csrf } = ctx.session
  // ctx.body = /** @type {Auth} */ ({
  //   linkedin_user,
  //   github_user: github_user ? {
  //     login: github_user.login,
  //     name: github_user.name,
  //     avatar_url: github_user.avatar_url,
  //     html_url: github_user.html_url,
  //   }: undefined,
  //   csrf,
  // })
}

export const middleware = ['checkCsrf']

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../').Auth} Auth
 */