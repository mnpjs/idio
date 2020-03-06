export default function DefaultLayout({ title, children, scripts = [], prod, CLOSURE }) {
  return (<html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <title>{title}</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
      {!prod && <script defer src="/hot-reload.js"></script>}
    </head>
    <body>
      {children}
      <Preact prod={prod} closure={CLOSURE}/>
      {scripts}
    </body>
  </html>)
}

/**
 * Add Preact tag.
 * @param {Object} param
 * @param {boolean} param.prod Whether running on production.
 * @param {boolean} param.closure Whether testing closure build.
 */
export const Preact = ({ prod, closure }) => {
  const preact = []
  if (prod) preact.push(<script src="https://cdnjs.cloudflare.com/ajax/libs/preact/8.5.3/preact.umd.js"/>)
  if (closure && !prod) preact.push(<script src="node_modules/preact/dist/preact.umd.js"/>)
  if (closure) preact.push(<script>{`window.h = preact.h`}</script>)
  return (<section id="preact-src">{preact}</section>)
}
