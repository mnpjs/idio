import { readFileSync } from 'fs'
const sw = readFileSync('docs/service-worker.js')

export default (ctx) => {
  ctx.type = 'js'
  ctx.body = sw
}