const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const passport = require('passport')
require('dotenv').config({ path: '../.env' })
require('./config/passport')

const { client } = require('./config/db')

const MongoStore = require('connect-mongo')

const sessionStore = new MongoStore({
  client: client,
  autoRemove: 'native',
  dbName: 'vue-dice',
  collectionName: 'sessions',
})

const cors = require('cors')

// sessin setup middleware

app.use(
  session({
    secret: 'hihello',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
)

app.use(
  cors({
    origin: ['http://localhost:8080'],
    credentials: true,
    exposedHeaders: ['*', 'Authorization'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    methods: ['GET', 'PUT', 'POST'],
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())
app.use(passport.session())

// middleware to see request format and find user
/* app.use((req, res, next) => {
  console.log(req.session, 'sess')
  console.log(req.session.passport, 'sess')
  console.log(req.user, 'user')
  next()
})
 */
const game = require('./routes/game')
const auth = require('./routes/auth')

app.use('/game', game)
app.use('/auth', auth)

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
