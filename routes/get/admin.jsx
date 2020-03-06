import { Preact, Script } from '..'

/**
 * @type {import('../..').Middleware}
 */
export default (ctx) => {
  ctx.body = ctx.render(<div className="container">
    <div className="row">
      <div className="col">
        <h1>Admin</h1>
        <div id="admin" />
      </div>
    </div>
    <hr/>
    {!ctx.prod && <script src="/hot-reload.js"></script>}
    <Script ctx={ctx} src="admin" />
  </div>, {
    title: '{{ name }} Admin',
    scripts: [
      <Script ctx={ctx} src="admin" />,
    ],
  })
}

export const middleware = ['adminCheck']