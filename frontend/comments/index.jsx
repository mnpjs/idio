import { render } from 'preact'
import unfetch from 'unfetch'
import CommentForm from './Form'
import Auth from '../Auth'
import AppUser from '../Auth/AppUser'
import List from './List'

class App extends Auth {
  constructor() {
    super()
    this.list = null
    this.state = {
      auth: {},
    }
  }
  get signedIn() {
    const { auth } = this.state
    const signedIn = auth.github_user || auth.linkedin_user
    return signedIn
  }
  getChildContext() {
    const { host } = this.props
    return {
      signedIn: this.signedIn,
      host,
      replyTo: this.state.replyTo,
      setReply: (val) => {
        if (val === null) {
          this.setState({ replyTo: undefined })
        } else {
          const { id, name, expandResponses } = val
          document.querySelector('[data-id="comment-text-area"]').scrollIntoView({
            behavior: 'smooth',
          })
          this.setState({ replyTo: { id, name, expandResponses } })
        }
      },
      async fetch(path, { query, ...options } = {}) {
        if (!path) throw new Error('No path given')
        if (query) path += App.serialize(query)
        if (path.startsWith('/')) path = path.replace('/', '')
        const url = /^https?:/.test(path) ? path : `${host}/api/${path}`
        const res = await unfetch(url, options)
        const { 'error': error, ...rest } = await res.json()
        if (error) throw new Error(error)
        return rest
      },
    }
  }
  render({ scope }) {
    const { auth, loading, error } = this.state

    return (<div>
      <AppUser error={error} loading={loading} auth={auth} host={this.props.host}
        onSignOut={() => {
          this.setState({ auth: {} })
        }} />

      <CommentForm
        path={`${this.props.host}/api/comment`} auth={auth}
        submitFinish={async (res) => {
          const { 'error': err, id } = await res.json()
          if (!err && id) {
            const { replyTo: { expandResponses } = {} } = this.state
            if (expandResponses) expandResponses(id)
            else if (this.list) this.list.fetch(id)
          }
        }} scope={scope}/>

      <List ref={(e) => {
        this.list = e
      }} />

    </div>)
  }
  static serialize(obj) {
    let str = []
    for (let p in obj)
      if (obj.hasOwnProperty(p)) {
        const val = obj[p]
        if (val === undefined) continue
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(val))
      }
    const s = str.join("&")
    if (!s.length) return ''
    return `?${s}`
  }
}

window['comments'] = ({
  'host': host = 'https://{{ name }}', 'container': container = 'preact-div',
  'scope': scope,
}) => {
  render(<App host={host} scope={scope}/>, document.getElementById(container))
}