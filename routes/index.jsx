export const Preact = ({ prod, closure }) => {
  const preact = []
  if (prod) preact.push(<script src="https://cdnjs.cloudflare.com/ajax/libs/preact/8.5.3/preact.umd.js"/>)
  if (closure && !prod) preact.push(<script src="node_modules/preact/dist/preact.umd.js"/>)
  if (closure) preact.push(<script>{`window.h = preact.h`}</script>)
  return (<section id="preact-src">{preact}</section>)
}

/**
 * @param {Object} props
 * @param {Context} props.ctx
 * @param {string} props.src
 */
export const Script = ({ ctx, src }) => {
  if (!ctx.CLOSURE) return (<script type="module" src={`frontend/${src}`}></script>)

  let s = src.startsWith('/') ? src : `/${src}`
  s = ctx.STATIC + s
  if (!s.endsWith('.js')) s += '.js'
  return (<script src={s}></script>)
}

/**
 * @typedef {import('../').Context} Context
 */