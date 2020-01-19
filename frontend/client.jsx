import { render } from 'preact'
import Comments from './comments'

const Client = {
  'comments'({
    'host': host = 'https://akashic.page', 'container': container = 'preact-div',
    'scope': scope, 'privacy': privacy = `${host}/privacy-policy.html`,
    'api_key': api_key,
  }) {
    render(<Comments api_key={api_key} host={host} scope={scope} privacy={privacy}/>, document.getElementById(container))
  },
}

window['Client'] = Client