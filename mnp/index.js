import hostname from './hostname'
import Static from './static'
import dokku, { dokkuPreUpdate } from './dokku'

/**
 * @type {Template}
 */
const config = {
  files: {
    filenames(a) {
      return [...a, '.env', '.settings']
    },
  },
  questions: {
    title: {
      text: 'Website Title',
    },
    hostname,
    namespace: {
      text: 'Namespace',
      alias: 'IDIO_NAMESPACE',
    },
    frontend: {
      text: 'Frontend',
      getDefault({ name }) {
        return name
      },
    },
    static: Static,
    dokku,
  },
  async afterInit(settings, api) {
    const { org, name, dokku: d } = settings
    const { git, loading, github, initManager, updateFiles, warn } = api
    await initManager()
    const { generateVAPIDKeys } = require('web-push')
    const { sync } = require('uid-safe')
    const { publicKey, privateKey } = generateVAPIDKeys()
    let env = `\nPUBLIC_VAPID=${publicKey}\nPRIVATE_VAPID=${privateKey}`
    await updateFiles([
      {
        re: /$/,
        replacement: env,
      },
      {
        re: /SESSION_KEY=001101/,
        replacement: `SESSION_KEY=${sync(18)}`,
      },
      {
        re: /CAPTCHA_KEY=catpcha/,
        replacement: `CAPTCHA_KEY=${sync(18)}`,
      },
    ], { file: '.env' })
    await loading('Enabling Pages on docs', github.pages.enable(org, name))
    if (d) {
      try {
        await dokkuPreUpdate(settings, api)
      } catch (err) {
        warn(err.stack)
      }
    }
    // await loading('Running Dokku commands', dokkuPreUpdate)
    await git(['rm', '--cached', '.env', '.settings'])
    await git(['commit', '-am', 'ignore settings'])
  },
}

export default config

/**
 * @typedef {import('mnp').Template} Template
 */