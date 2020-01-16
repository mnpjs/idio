import { ObjectID } from 'mongodb'

/**
 * Removes a comment from the database.
 * @type {import('../../').Middleware}
 */
export default async (ctx) => {
  const { linkedin_user, github_user } = ctx.session
  const { id } = ctx.params

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
}

export const aliases = ['/remove-comment/:id']
export const middleware = ['csrfCheck']

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../').Auth} Auth
 */