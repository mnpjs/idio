export default {
  text: 'Hostname',
  getDefault ({ name }) {
    return name
  },
  alias: 'https://mnpjs.github.io/idio/',
  afterQuestions({ name }, hostname) {
    return {
      hostname,
      url: hostname,
      'safe-name': name.replace(/[^\w\d_-]/g, '-'),
    }
  },
}