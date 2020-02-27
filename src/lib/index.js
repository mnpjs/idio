import { connect } from 'mongodb'
import { c } from 'erte'

/**
 * Connects to a mongo database.
 * @param {string} mongo The address of the dabase.
 */
export const connectMongo = async (mongo, silent = false) => {
  const d = new Date()
  const m = await connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  if (!silent) {
    console.log('Connected to %s in %ss',
      c(mongo.replace(/.+@(.+)/, 'mongodb://$1'), 'yellow'),
      (new Date().getTime() - d.getTime())/1000,
    )
  }
  return m
}