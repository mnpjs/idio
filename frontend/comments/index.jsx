import CommentForm from './Form'
import AuthApp from '../Auth'
import AppUser from '../Auth/AppUser'
import List from './List'

export default class Comments extends AuthApp {
  constructor() {
    super()
    this.list = null
  }
  get signedIn() {
    const { auth } = this.state
    const signedIn = auth.github_user || auth.linkedin_user
    return signedIn
  }
  getChildContext() {
    const { host } = this.props
    const { api_key } = this.props
    return {
      host,
      api_key,
      signedIn: this.signedIn,
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
      fetch: this.fetch.bind(this),
    }
  }
  render({ scope, privacy, api_key }) {
    const { auth, loading, error } = this.state

    if (!api_key) return (<div>Please pass the API key as api_key property.</div>)

    return (<div>
      <AppUser privacy={privacy} error={error} loading={loading} auth={auth} host={this.props.host} signOut={this.signOut.bind(this)} />

      <CommentForm
        path={`${this.props.host}/api/${api_key}/comment`} auth={auth}
        submitFinish={async (res) => {
          const { error: err, id } = await res.json()
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
}