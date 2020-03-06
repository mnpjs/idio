import { render } from 'preact'
import App from './App'

const admin = <App />
const a = render(admin, document.querySelector('#admin'))

/* IDIO HOT RELOAD */
window['idioAddHotReload'] && window['idioAddHotReload'](() => {
  render(admin, document.querySelector('#admin'), a)
})