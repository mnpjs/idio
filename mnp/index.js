/**
 * @type {Template}
 */
const config = {
  files: {
    filenames(a) {
      return [...a, 'CNAME']
    },
  },
}

export default config

/**
 * @typedef {import('mnp').Template} Template
 */