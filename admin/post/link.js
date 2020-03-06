/**
 * @type {import('../../types').Middleware}
 */
export default async (ctx) => {
  let { location, path } = ctx.request.body
  if (!path) ctx.throw(400, 'Path is missing.')
  if (!location) ctx.throw(400, 'Location is missing.')

  if (!path.startsWith('/')) path = `/${path}`

  const e = await ctx.db.Link.findOne({ path })
  if (e) ctx.throw(400, 'Such path already exists.')

  const res = await ctx.db.Link.insert({
    location, path,
  })
  ctx.body = { count: res.insertedCount }
}

export const middleware = ['forms']