const express = require('express')
const router = express.Router()

const { isAuth } = require('../utils/authMiddleWare')
const ObjectId = require('mongodb').ObjectId

const { connectToGames } = require('../config/db')

router.get('/all', isAuth, async (req, res) => {
  const Games = await connectToGames()

  const queryResult = await Games.find({})

  const result = await queryResult.toArray()

  res.status(200).send(result)
})

router.get('/all/user', isAuth, async (req, res) => {
  const Games = await connectToGames()
  const userId = req.session.passport.user

  const queryResult = await Games.find({
    users: { $elemMatch: { userId: userId } },
  })

  const result = await queryResult.toArray()
  console.log(result)

  res.status(200).send(result)
})

router.post('/new', isAuth, async (req, res) => {
  const Games = await connectToGames()
  const newGame = req.body

  const result = await Games.insertOne(newGame)
  res.status(200).send(result.insertedId)
})

router.post('/join', isAuth, async (req, res) => {
  const Games = await connectToGames()
  const newUser = req.body.user
  const gameId = new ObjectId(req.body.gameId)
  const filter = { _id: gameId }
  const updateDocument = {
    $push: {
      users: newUser,
    },
  }

  const result = await Games.updateOne(filter, updateDocument)
  res.status(200).send(result)
})

router.post('/update', isAuth, async (req, res) => {
  const Games = await connectToGames()
  const updatedUsers = req.body.users
  const gameId = new ObjectId(req.body._id)
  const filter = { _id: gameId }
  const updateDocument = {
    $set: {
      users: updatedUsers,
    },
  }
  const result = await Games.updateOne(filter, updateDocument)
  res.status(200).send(result)
})

module.exports = router
