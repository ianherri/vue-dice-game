const express = require('express')
const router = express.Router()
const passport = require('passport')
const { genPassword } = require('../utils/passwordutil')
const { isAuth, isExist } = require('../utils/authMiddleWare')
const ObjectId = require('mongodb').ObjectId

const { connectToUsers } = require('../config/db')

router.get('/', isAuth, async (req, res) => {
  const Users = await connectToUsers()
  const userId = new ObjectId(req.session.passport.user)
  const user = await Users.findOne({ _id: userId })
  res.status(200).send(user)
})

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).send({ user: req.user })
})

router.post('/logout', (req, res) => {
  req.logout()
  res.send('logged out')
})

router.post('/register', isExist, async (req, res) => {
  const Users = await connectToUsers()
  // check if user already exists
  console.log(req.body, 'at router')
  const { hash, salt } = genPassword(req.body.password)
  const newUser = {
    username: req.body.username,
    password: hash,
    salt: salt,
  }

  Users.insertOne(newUser)
  res.status(200).send({ user: req.user })
})

module.exports = router
