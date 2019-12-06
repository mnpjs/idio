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
    },
    frontend: {
      text: 'Frontend hostname.',
      getDefault ({ name }) {
        return `www.${name}`
      },
    },
  },
  async afterInit({ org, name }, { loading, github }) {
    await loading('Enabling Pages on docs', github.pages.enable(org, name))
  },
}

export default config

/**
 * @typedef {import('mnp').Template} Template
 */