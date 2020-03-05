export default {
  text: 'Static Hostname',
  getDefault ({ name, org }) {
    return `${org}.github.io/${name}`
  },
  afterQuestions({ writeFileSync }, staticHost, { org, name }) {
    const def = `${org}.github.io/${name}`
    if (def != staticHost) {
      writeFileSync('docs/CNAME', staticHost)
    }
  },
}