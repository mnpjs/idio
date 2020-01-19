import { Component } from 'preact'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default class $Subscription extends Component {
  constructor() {
    super()
    this.register = null
    this.scope = null
  }
  componentDidMount() {
    const { scope = '/' } = this.props
    this.register = $Subscription.getRegister(scope)
    this.scope = scope
  }
  componentDidUpdate() {
    const { scope = '/' } = this.props
    if (scope == this.scope) return
    this.register = $Subscription.getRegister(scope)
    this.scope = scope
  }
  static async getRegister(scope = '/') {
    const register = await navigator.serviceWorker.register(`${scope}service-worker.js`, {
      scope,
    })
    return register
  }
  async _getRegister() {
    return this.register
  }
  /**
   * @param {string} [method] Register comments for this method.
   */
  async _subscribe(method = 'comments') {
    const { 'public_vapid': vapidPublicKey } = await this.context.fetch('vapid')
    if (!vapidPublicKey) throw new Error('Could not fetch vapid key.')

    const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey)
    const register = await this._getRegister()
    const subscription = await register.pushManager.subscribe({
      applicationServerKey,
      userVisibleOnly: true,
    })
    const body = new FormData()
    const { endpoint, keys: { p256dh, auth } } = getSub(subscription)
    body.append('endpoint', endpoint)
    body.append('auth', auth)
    const res = await this.context.fetch(`subscribe/${p256dh}/${method}`, {
      method: 'POST',
      body,
    })
    return res
  }
  async _unsubscribe(method = 'comments') {
    const register = await this._getRegister()
    const subscription = await register.pushManager.getSubscription()
    const { keys: { p256dh } } = getSub(subscription)
    const res = await this.context.fetch(`unsubscribe/${p256dh}/${method}`)
    return res
    // return { comments, updates }
  }
  /**
   * Return an object indicating which objects the client is subscibed to.
   * @return {!Promise<{comments:boolean, updates:boolean, p256dh: ?string}>}
   */
  async checkSubscribed() {
    const register = await this._getRegister()
    const sub = await register.pushManager.getSubscription()
    try {
      const { keys: { p256dh } } = getSub(sub)
      const {
        comments, updates,
      } = /** @type {!Subscription} */ (await this.context.fetch(`subscriptions/${p256dh}`))
      return { comments, updates, p256dh }
    } catch (err) {
      return { p256dh: null, comments: false, updates: false }
    }
  }
}

/**
 * Returns the properties of the subscription.
 * @param {PushSubscription} subscription
 */
const getSub = (subscription) => {
  const { endpoint, 'keys': { 'p256dh': p256dh, 'auth': auth } } = JSON.parse(JSON.stringify(subscription))
  return { endpoint, keys: { p256dh, auth } }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').Subscription} Subscription
 */