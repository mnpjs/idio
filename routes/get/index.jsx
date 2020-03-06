import { Script } from '..'

/**
 * @type {import('../..').Middleware}
 */
export default (ctx) => {
  const title = '{{ name }}'
  const description = '{{ description }}'
  ctx.body = ctx.render(<div className="container">
    <div className="row">
      <div className="col">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <h2>Comments</h2>
        <div id="comments" />
      </div>
    </div>
    <hr/>
  </div>, {
    title: '{{ name }}',
    scripts: [
      <Script ctx={ctx} src="client" />,
      <script type={ctx.CLOSURE ? '' : 'module'} dangerouslySetInnerHTML={{ __html: `(${init.toString('${ctx.HOST}')})('${ctx.HOST}')` }} />,
    ],
  })
}

const init = (host) => {
  const api_key = '{{ save-name }}'
  /* eslint-env browser */
  window.Client.comments({
    api_key,
    host,
    container: 'comments',
  })
}

export const route = '/'