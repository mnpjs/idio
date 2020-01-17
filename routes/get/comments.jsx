import { Script } from '../'

/**
 * @type {import('../..').Middleware}
 */
export default async (ctx) => {
  const { CLOSURE, HOST, prod } = ctx

  const App = (<div>
    <div id="preact-div" className="container"/>

    {prod && <script src="https://cdnjs.cloudflare.com/ajax/libs/preact/8.5.3/preact.umd.js"/>}
    {(CLOSURE && !prod) && <script src="node_modules/preact/dist/preact.umd.js"/>}
    {CLOSURE && <script>{`window.h = preact.h`}</script>}

    <Script ctx={ctx} src="comments"/>

    <script type={CLOSURE ? undefined : 'module'}>
      {`window.comments({ host: '${HOST}' })`}
    </script>
  </div>)

  ctx.body = ctx.render(App.children, { title: 'Comments' })
}