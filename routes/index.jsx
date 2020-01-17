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