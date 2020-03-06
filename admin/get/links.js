/**
 * @type {import('../..').Middleware}
 */
export default async (ctx) => {
  const res = await ctx.db.Link.find().toArray()
  ctx.body = res
}