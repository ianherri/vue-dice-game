const { connectToUsers } = require('../config/db')

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).send('not authorized')
  }
}

const isExist = async (req, res, next) => {
  const Users = await connectToUsers()
  const exists = await Users.findOne({ username: req.body.username })
  if (!exists) {
    next()
  } else {
    res.status(401).send('user already exists')
  }
}

module.exports = {
  isAuth,
  isExist,
}
