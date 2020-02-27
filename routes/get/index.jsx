/**
 * @type {import('../..').Middleware}
 */
export default (ctx) => {
  const { STATIC } = ctx
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/preact/8.5.3/preact.umd.js" />
    <script src={`${STATIC}/client.js`} />
    <script dangerouslySetInnerHTML={{ __html: `(${init.toString()})()` }} />
  </div>, {
    title: '{{ name }}',
  })
}

const init = () => {
  const api_key = '{{ safe-name }}'
  /* eslint-env browser */
  window.Client({
    api_key,
    container: 'comments',
  })
}

export const route = '/'