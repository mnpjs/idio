import Context, { Persistent } from '../context'

/** @type {Object.<string, (p: Persistent, c: Context)>} */
const TS = {
  context: [Persistent, Context],
  async'starts app'({ app }, { startApp }) {
    await startApp(app)
      .get('/')
      .assert(404)
  },
}

/** @type {Object.<string, (p: Persistent, c: Context)>} */
export const API = {
  context: [Persistent, Context],
  async'returns empty subscriptions'({ app, api_key }, { startApp }) {
    await startApp(app)
      .set('referer', 'https://{{ host }}')
      .get(`/api/${api_key}/subscriptions/p256dh/`)
      .assert(200, {})
  },
}

export default TS