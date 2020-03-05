export default {
  text: 'Dokku Host (type - for no host)',
  getDefault({ name }) {
    return name
  },
  async afterQuestions({ git }, dokku, { name }) {
    if (name == '-') return null
    await git('remote', 'add', 'dokku', `dokku@${dokku}:${name}`)
  },
}

export const dokkuPreUpdate = async ({ dokku, name }, { resolve, warn }) => {
  const { fork } = require('spawncommand')
  const p = resolve('node_modules/dokku/compile/bin/dokku.js')
  const args = ['--host', dokku,
    '--app', name]
  warn(p, ...args)
  let { stdout, stderr, promise } = fork(p, ['apps:create', ...args], {
    silent: true,
    execArgv: [],
  })
  stdout.pipe(process.stdout)
  stderr.pipe(process.stderr)
  const { stderr: e, code } = await promise
  if (code) throw new Error(e)

  // letsencrypt
  ;({ stdout, stderr, promise } = fork(p, ['letsencrypt', ...args], {
    silent: true,
    execArgv: [],
  }))
  stdout.pipe(process.stdout)
  stderr.pipe(process.stderr)
  const { stderr: e1, code: code1 } = await promise
  if (code1) throw new Error(e1)
  await promise
}