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
    dokku: {
      text: 'Dokku Host (type - for no host)',
      getDefault ({ name }) {
        return name
      },
      async afterQuestions({ git }, dokku, { name }) {
        if (name == '-') return null
        await git('remote', 'add', 'origin', `dokku@${dokku}:${name}`)
      },
    },
  },
  async afterInit({ org, name }, { git, loading, github, initManager, updateFiles }) {
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
        replacement: sync(18),
      },
      {
        re: /CAPTCHA_KEY=catpcha/,
        replacement: sync(18),
      },
    ], { file: '.env' })
    await loading('Enabling Pages on docs', github.pages.enable(org, name))
    await git(['rm', '--cached', '.env', '.settings'])
    await git(['commit', '-am', 'ignore settings'])
  },
}

export default config

/**
 * @typedef {import('mnp').Template} Template
 */