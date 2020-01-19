import { Script, Preact } from '../'

/**
 * @type {import('../..').Middleware}
 */
export default async (ctx) => {
  const { CLOSURE, HOST, prod } = ctx

  const App = (<div>
    <div id="preact-div" className="container"/>

    <Preact prod={prod} closure={CLOSURE} />

    <Script ctx={ctx} src="client"/>

    <script type={CLOSURE ? undefined : 'module'}>
      {`window.Client.comments({
        host: '${HOST}',
        api_key: 'idio',
      })`}
    </script>
  </div>)

  ctx.body = ctx.render(App.children, { title: 'Comments' })
}