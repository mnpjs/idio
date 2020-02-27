/**
 * @param {import('mongodb').MongoClient} Mongo
 */
export default (Mongo) => {
  const mongo = Mongo.db()
  return {
    mongo,
    db: {
      get Subscriptions() {
        return mongo.collection('Subscriptions')
      },
      get Comments() {
        return mongo.collection('Comments')
      },
      get Emails() {
        return mongo.collection('Emails')
      },
      get Vapid() {
        return mongo.collection('Vapid')
      },
    },
  }
}