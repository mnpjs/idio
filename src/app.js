import { Client } from '@elastic/elasticsearch'
import { c } from 'erte'
import webpush from 'web-push'
import { connectMongo } from './lib'
import Server from './server'

const {
  ELASTIC: elastic, MONGO_URL, NODE_ENV,
  PUBLIC_VAPID: public_vapid, PRIVATE_VAPID: private_vapid,
} = process.env

const PROD = NODE_ENV == 'production'

if (!elastic) throw new Error('Expecting ELASTIC env variable')
if (!MONGO_URL) throw new Error('Expecting MONGO_URL env variable')
if (!private_vapid) throw new Error('Expecting PRIVATE_VAPID env variable')
if (!public_vapid) throw new Error('Expecting PUBLIC_VAPID env variable')

const client = new Client({
  node: elastic,
})

webpush.setVapidDetails('https://{{ name }}', public_vapid, private_vapid)

;(async () => {
  try {
    const [Mongo] = await Promise.all([
      connectMongo(MONGO_URL),
      client.ping().then(() => {
        console.log('Pinged ElasticSearch at %s', c(elastic, 'red'))
      }),
    ])
    const { url } = await Server({
      client, port: process.env.PORT,
      client_id: process.env.LINKEDIN_ID,
      client_secret: process.env.LINKEDIN_SECRET,
      github_id: process.env.GITHUB_ID,
      github_secret: process.env.GITHUB_SECRET,
      elastic, Mongo,
      appName: PROD ? '{{ name }}' : 'dev.{{ name }}',
    })
    console.log('Started on %s', c(url, 'green'))
  } catch ({ stack }) {
    console.log(stack)
    process.exit(1)
  }
})()