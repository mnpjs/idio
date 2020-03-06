/**
 * @type {import('../../types').Middleware}
 */
export default async (ctx) => {
  let { path } = ctx.request.body
  if (!path) ctx.throw(400, 'Path is missing.')

  if (!path.startsWith('/')) path = `/${path}`

  const res = await ctx.db.Link.deleteOne({
    path,
  })
  ctx.body = { count: res.deletedCount }
}

export const middleware = ['forms']