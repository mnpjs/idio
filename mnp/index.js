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
    hostname: {
      text: 'Hostname',
      getDefault ({ name }) {
        return name
      },
      alias: 'https://mnpjs.github.io/idio/',
      afterQuestions(_, hostname) {
        return {
          hostname,
          url: hostname,
        }
      },
    },
    frontend: {
      text: 'Frontend',
      getDefault ({ name }) {
        return name
      },
    },
    static: {
      text: 'Static Hostname',
      getDefault ({ name, org }) {
        return `${org}.github.io/${name}`
      },
      afterQuestions({ org, name, writeFileSync }, staticHost) {
        const def = `${org}.github.io/${name}`
        if (def != staticHost) {
          writeFileSync('docs/CNAME', staticHost)
        }
      },
    },
  },
  async afterInit({ org, name }, { git, loading, github, initManager, updateFiles }) {
    await initManager()
    const { generateVAPIDKeys } = require('web-push')
    const { sync } = require('uid-safe')
    const { publicKey, privateKey } = generateVAPIDKeys()
    let env = `\nPUBLIC_VAPID=${publicKey}\nPRIVATE_VAPID=${privateKey}`
    const session = sync(18)
    const captcha = sync(18)
    env = env.replace('SESSION_KEY=001101', `SESSION_KEY=${session}`)
    env = env.replace('CAPTCHA_KEY=catpcha', `CAPTCHA_KEY=${captcha}`)
    await updateFiles({
      re: /$/,
      replacement: env,
    }, { file: '.env' })
    await loading('Enabling Pages on docs', github.pages.enable(org, name))
    await git(['rm', '--cached', '.env', '.settings'])
    await git(['commit', '-am', 'ignore settings'])
  },
}

export default config

/**
 * @typedef {import('mnp').Template} Template
 */