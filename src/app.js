import { connect } from 'mongodb'
import { Client } from '@elastic/elasticsearch'
import { c } from 'erte'
import Server from './server'

const elastic = process.env.ELASTIC
if (!elastic) throw new Error('Expecting ELASTIC env variable')

const mongo = process.env.MONGO_URL
if (!mongo) throw new Error('Expecting MONGO_URL env variable')

const client = new Client({
  node: elastic,
})

;(async () => {
  try {
    const [Mongo] = await Promise.all([
      connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((m) => {
          console.log('Connected to %s', c(mongo.replace(/.+@(.+)/, 'mongodb://$1'), 'yellow'))
          return m
        }),
      client.ping().then(() => {
        console.log('Connected to %s', c(elastic, 'red'))
      }),
    ])
    const { url } = await Server({
      client, port: process.env.PORT,
      client_id: process.env.LINKEDIN_ID,
      client_secret: process.env.LINKEDIN_SECRET,
      github_id: process.env.GITHUB_ID,
      github_secret: process.env.GITHUB_SECRET,
      elastic, Mongo,
      appName: '{{ name }}',
    })
    console.log('Started on %s', c(url, 'green'))
  } catch ({ stack }) {
    console.log(stack)
    process.exit(1)
  }
})()