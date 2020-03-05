export default {
  text: 'Hostname',
  getDefault({ name }) {
    return name
  },
  alias: 'https://mnpjs.github.io/idio/',
  afterQuestions(_, hostname, { name }) {
    return {
      hostname,
      url: hostname,
      'safe-name': name.replace(/[^\w\d_-]/g, '-'),
    }
  },
}