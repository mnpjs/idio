import { ObjectID } from 'mongodb'
import { parse } from 'url'

/** @type {import('../../').Middleware} */
export default async (ctx) => {
  const { csrf, linkedin_user, github_user } = ctx.session

  const { page = 1, id, 'reply-to': replyTo = null,
    'last-comment-id': lastCommentId,
  } = ctx.request.query
  const { referer } = ctx.request.header
  if (!referer) return ctx.status = 404
  const { path } = parse(referer)

  const skip = (page - 1) * 20

  const Comments = ctx.mongo.collection('comments')

  let lastId
  if (lastCommentId) lastId = ObjectID(lastCommentId)

  const filter = {
    replyTo,
    removed: null,
    path,
    ...(lastId ? { _id: {
      $lt: lastId,
    } } : {}),
  }

  /** @type {import('../..').WebsiteComment[]} */
  let comments
  if (id) {
    comments = await Comments.find({
      _id: ObjectID(id),
    }).toArray()
  } else {
    comments = await Comments.find(filter)
      .skip(skip).limit(10).sort({ date: -1 }).toArray()
  }

  const cm = comments.map((comment) => {
    const { linkedin_user: l, github_user: g, hideGithub } = comment
    if (l && linkedin_user && l.id == linkedin_user.id) {
      comment.isAuthor = true
    } else if (g && github_user && github_user.html_url == g.html_url) {
      comment.isAuthor = true
    }
    if (l) delete l.id
    if (hideGithub) delete comment.github_user
    delete comment.ip
    delete comment.subId
    delete comment.replyTo
    return comment
  })
  ctx.body = { comments: cm, csrf }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../').Auth} Auth
 */