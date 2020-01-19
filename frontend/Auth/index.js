import { Component } from 'preact'
import { fetch } from '../lib'

/**
 * An app that fetches authorisation data from the server on start.
 * Provides the `fetch` method to load data.
 */
export default class AuthApp extends Component {
  constructor() {
    super()

    this.state = {
      loading: false,
      error: null,
      /** @type {!Auth} */
      auth: {},
    }
    this.pml = /** @type {function(!Event)} */(this.postMessageListener.bind(this))

    /** @type {!AuthAppProps} */
    this.props = this.props

    window.addEventListener('message', this.pml, false)
  }
  componentDidMount() {
    this.auth()
  }
  /**
   * Load data from the server.
   * @param {string} path
   * @param {RequestInit} opts
   */
  async fetch(path, { query,
    api_key = this.props.api_key,
    route = this.props.route,
    ...options
  } = {}) {
    const { host = '' } = this.props
    return fetch(path, query, host, api_key, options, route)
  }
  async signOut() {
    const formData = new FormData()
    formData.append('csrf', this.state.auth.csrf)

    await this.fetch('signout', {
      route: '',
      api_key: '',
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
    this.setState({ auth: {} })
  }
  async auth() {
    this.setState({ loading: true })
    try {
      const auth = /** @type {Auth} */ (await this.fetch('auth', {
        credentials: 'include',
        route: '',
        api_key: '',
      }))
      this.setState({ auth })
    } catch (err) {
      this.setState({ error: err.message })
    } finally {
      this.setState({ loading: false })
    }
  }
  /**
   * @param {!MessageEvent} event
   */
  postMessageListener(event) {
    const { data, origin } = event
    if (this.props.host && origin != this.props.host) return
    if (data == 'signedin') this.auth()
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.pml)
  }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').Auth} Auth
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').AuthAppProps} AuthAppProps
 */
