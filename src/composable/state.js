import { ref } from 'vue'
import { scoreMap, User, Game, Die, changeActiveUser } from './utilities'
import axios from 'axios'

axios.defaults.withCredentials = true

const message = ref('')
const games = ref([])
const game = ref()
const loading = ref(true)
const activeUserData = ref()
const userData = ref()
const rolls = ref(0)

// takes in a userId and starts a new game with a single user

async function startGame(userId) {
  // check for non-empty list of non-empty values
  const user = new User(userId)
  // set user active who started the game
  user.active = true
  let dice = [0, 0, 0, 0, 0]
  const game = ref(new Game([], []))

  game.value.users.push(user)

  game.value.dice = dice.map(() => {
    return new Die(Math.floor(Math.random() * 6) + 1, false)
  })

  const response = await axios
    .post('http://localhost:3000/game/new', game.value)
    .catch((error) => {
      message.value = error
    })
  if (response) {
    game.value.id = response.data
  }
}

// takes in a userId and gameId and adds player to game
// but only if the game hasn't gone past 1 turn yet?
// alternatively... in submit score, I check for the number of turns people have gne
// and if someone needs to catch up, I let them go until they catch up
async function joinGame(userId, gameId) {
  loading.value = true
  // todo, set active to false
  const user = new User(userId)
  const request = { user: user, gameId: gameId }
  const alreadyJoined = await getSingleGameForUser(userId, gameId)
  if (!alreadyJoined) {
    const response = await axios
      .post('http://localhost:3000/game/join', request)
      .catch((error) => {
        message.value = error
      })
    if (response) {
      console.log(response)
      loading.value = false
    }
  }
  // game.value.users.push(new ScoreCard(userId))
  loading.value = false
  console.log(userId, gameId)
}

// retrieves all games for single userId and stores them to the games state variable
async function getAllGamesForUser() {
  const response = await axios
    .get('http://localhost:3000/game/all/user')
    .catch((error) => {
      message.value = error
    })
  if (response) {
    games.value = response.data
  }
}

// returns all games
async function getAllGames() {
  const response = await axios
    .get('http://localhost:3000/game/all')
    .catch((error) => {
      message.value = error
    })
  if (response) {
    games.value = response.data
  }
}

async function getSingleGameForUser(gameId, userId) {
  loading.value = true
  // returns all games a user is in
  const response = await axios
    .get('http://localhost:3000/game/all/user')
    .catch((error) => {
      message.value = error
    })
  if (response) {
    if (response.data.length === 0) {
      message.value =
        'sorry, you are not a part of this game, go back to your profile no data on response'
      console.log(message.value)
      loading.value = false
    }
    // this isn't working
    else if (response.data.map((game) => game._id).includes(gameId)) {
      game.value = response.data.filter((game) => game._id === gameId)[0]
      activeUserData.value = game.value.users.filter((user) => user.active)[0]
      userData.value = game.value.users.filter(
        (user) => user.userId === userId
      )[0]
    } else {
      message.value =
        'sorry, you are not a part of this game, go back to your profile not game'
      loading.value = false
    }
  }
  loading.value = false
}

function selectDie(dieId) {
  game.value.dice.forEach((die) => {
    if (die.id === dieId) {
      die.selected = !die.selected
    }
  })
}

// needs to:
// make sure the active user it clicking it
function rollDice() {
  /* const activeUserId = activeUserData.value.userId
  if (!(activeUserId === userId)) {
    return
  } */
  game.value.dice.forEach((die) => {
    if (!die.selected) {
      die.value = Math.floor(Math.random() * 6) + 1
    }
  })
}

function resetDice() {
  game.value.dice.map((die) => {
    die.selected = false
    die.value = 0
  })
}

// needs to:
// make sure active user is clicking it -> DONE
// calculate possible scores
// send score to backend
// change active user -> DONE
// reset dice and turns counter
async function submitTurn(userId) {
  const users = game.value.users
  // const gameId = game.value._id
  const activeUserId = activeUserData.value.userId

  if (!(activeUserId === userId)) {
    return
  }

  activeUserData.value.scoreCard.forEach((score) => {
    if (!score.staged && !score.submitted) {
      score.score = 0
    }
    if (score.staged) {
      score.submitted = true
      score.staged = false
    }
  })

  changeActiveUser(users, activeUserId)

  const response = await axios
    .post('http://localhost:3000/game/update', game.value)
    .catch((error) => {
      message.value = error
    })

  if (response) {
    console.log(response.data)
  }

  resetDice()
  rolls.value = 0
}

const calculatePossibleScores = () => {
  const dice = game.value.dice.map((die) => die.value)

  activeUserData.value.scoreCard.forEach((score) => {
    if (!score.submitted) {
      const calc = scoreMap[score.id].getScore(dice)
      score.score = calc
    }
  })
}

function selectScoreForSubmission(scoreId) {
  activeUserData.value.scoreCard.forEach((score) => {
    if (score.id === scoreId) {
      score.staged = !score.staged
    }
  })
}

export default function useState() {
  return {
    startGame,
    games,
    game,
    rollDice,
    joinGame,
    getAllGamesForUser,
    getSingleGameForUser,
    loading,
    selectDie,
    submitTurn,
    calculatePossibleScores,
    activeUserData,
    userData,
    selectScoreForSubmission,
    getAllGames,
    message,
    resetDice,
    rolls,
  }
}
