/**
 * @param {import('mongodb').MongoClient} Mongo
 */
export default (Mongo) => {
  const db = new DB(Mongo)
  return {
    mongo: db.mongo,
    db,
  }
}

export class DB {
  /**
   * @param {import('mongodb').MongoClient} Mongo
   */
  constructor(Mongo) {
    const mongo = Mongo.db()
    this.mongo = mongo
  }
  get Subscriptions() {
    return this.mongo.collection('Subscriptions')
  }
  /**
   * Stores comments.
   * @type {import('mongodb').Collection<import('../types/collections').Link>}
   */
  get Comments() {
    return this.mongo.collection('Comments')
  }
  get Emails() {
    return this.mongo.collection('Emails')
  }
  get Vapid() {
    return this.mongo.collection('Vapid')
  }
}