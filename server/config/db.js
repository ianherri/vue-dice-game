require('dotenv').config({ path: '../../.env' })
const { MongoClient } = require('mongodb')

const uri = process.env.MONGODB_URI

const client = new MongoClient(uri)

async function connectToUsers() {
  const conn = await MongoClient.connect(uri, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })

  const connection = await conn.db('vue-dice').collection('users')
  return connection
}

async function connectToGames() {
  const conn = await MongoClient.connect(uri, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })

  const connection = await conn.db('vue-dice').collection('games')
  return connection
}

module.exports = {
  connectToUsers,
  connectToGames,
  client,
}
