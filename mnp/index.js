/**
 * @type {Template}
 */
const config = {
  files: {
    filenames(a) {
      return [...a, 'CNAME']
    },
  },
  questions: {
    title: {
      text: 'Webiste Title',
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
  },
  async afterInit({ org, name }, { spawn, loading, github }) {
    await loading('Enabling Pages on docs', github.pages.enable(org, name))
    await spawn('git', ['rm', '--cached', '.env', '.settings'])
    await spawn('git', ['commit', '-am', 'ignore settings'])
  },
}

export default config

/**
 * @typedef {import('mnp').Template} Template
 */