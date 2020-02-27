import Cookie from '@contexts/http/cookies'
import Server from '../../src/server'
import { connectMongo } from '../../src/lib'

const { MONGO_URL: mongo = 'mongodb://localhost:27017/test-{{ safe-name }}' } = process.env

export class Persistent {
  async _init() {
    const Mongo = await connectMongo(mongo)
    this.Mongo = Mongo
    this.app = await this.getApp({
      Mongo,
    })
  }
  get api_key() {
    return '{{ safe-name }}-test'
  }
  /**
   * Returns an app.
   * @param {{}} options
   */
  async getApp(options) {
    const { app } = await Server({
      ...options,
      port: null,
      client_id: 'test',
      client_secret: 'test',
      github_id: 'test',
      github_secret: 'test',
      watch: false,
      appName: '{{ name }}',
    })
    this._app = app
    return app
  }
  async _destroy() {
    // remove the database
    if (this.Mongo) await this.Mongo.close(true)
    if (this.app) await this.app.destroy()
  }
}

export default class Context extends Cookie {
  startApp(app, plain = true) {
    const cb = app.callback()
    if (plain)
      return this.startPlain(cb)
    return this.start(cb)
  }
  // async _init() {
  //
  //   this.app = app
  //   this.url = url
  // }
  // async _destroy() {
  //   if (this.app) await this.app.destroy()
  // }
  // async ping(path) {
  //   const r = `${this.url}${path}`
  //   const { statusCode } = await aqt(r, { justHeaders: true })
  //   equal(statusCode, 200)
  // }
  // setClient(client) {
  //   this.app.context.client = client
  // }
}