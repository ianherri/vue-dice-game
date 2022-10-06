const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { connectToUsers } = require('./db')
const { validPassword } = require('../utils/passwordutil')

const verifyCallBack = async (username, password, done) => {
  const Users = await connectToUsers()
  const user = await Users.findOne({ username: username })
  if (!user) {
    console.log('fail at !user')
    return done(null, false)
  }
  // write verify password function

  if (!validPassword(password, user.password, user.salt)) {
    console.log('fail at pw')
    return done(null, false)
  }
  console.log('made it to end')
  return done(null, user)
}

passport.use(new LocalStrategy(verifyCallBack))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (userId, done) => {
  const Users = await connectToUsers()
  const user = Users.findOne({ _id: userId })

  done(null, user)
})
