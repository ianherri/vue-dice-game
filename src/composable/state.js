import { ref } from 'vue'
import {
  scoreFiveKind,
  scoreFourKind,
  scoreFullHouse,
  scoreLargeStraight,
  scoreSmallStraight,
  scoreThreeKind,
  scoreOne,
  scoreTwo,
  scoreThree,
  scoreFour,
  scoreFive,
  scoreSix,
  scoreChance,
} from './utilities'

// these are the dice used

const game = ref([])

const initGame = ref(true)

const dice = ref([
  { id: 1, val: 1, selected: false },
  { id: 2, val: 1, selected: false },
  { id: 3, val: 1, selected: false },
  { id: 4, val: 1, selected: false },
  { id: 5, val: 1, selected: false },
])

const rolls = ref(0)

const scoreSubmitting = ref(false)

const scoreOptions = ref([])

function resetDice() {
  dice.value = dice.value.map((die) => ({ ...die, val: 'x', selected: false }))
  rolls.value = 0
}

function startGame(players) {
  const userTemp = {
    userId: '',
    userName: '',
    active: true,
    score: [
      { id: 0, name: 'ones', score: 0, submitted: false, getScore: scoreOne },
      { id: 1, name: 'twos', score: 0, submitted: false, getScore: scoreTwo },
      {
        id: 2,
        name: 'threes',
        score: 0,
        submitted: false,
        getScore: scoreThree,
      },
      { id: 3, name: 'fours', score: 0, submitted: false, getScore: scoreFour },
      { id: 4, name: 'fives', score: 0, submitted: false, getScore: scoreFive },
      { id: 5, name: 'sixes', score: 0, submitted: false, getScore: scoreSix },
      {
        id: 6,
        name: 'three of a kind',
        score: 0,
        submitted: false,
        getScore: scoreThreeKind,
      },
      {
        id: 7,
        name: 'four of a kind',
        score: 0,
        submitted: false,
        getScore: scoreFourKind,
      },
      {
        id: 8,
        name: 'fullhouse',
        score: 0,
        submitted: false,
        getScore: scoreFullHouse,
      },
      {
        id: 9,
        name: 'small straight',
        score: 0,
        submitted: false,
        getScore: scoreSmallStraight,
      },
      {
        id: 10,
        name: 'large straight',
        score: 0,
        submitted: false,
        getScore: scoreLargeStraight,
      },
      {
        id: 11,
        name: 'yahtzee',
        score: 0,
        submitted: false,
        getScore: scoreFiveKind,
      },
      {
        id: 12,
        name: 'chance',
        score: 0,
        submitted: false,
        getScore: scoreChance,
      },
    ],
  }
  console.log(players)
  for (let i = 0; i < players.length; i++) {
    const randId = Math.floor(Math.random() * 1000000)
    game.value.push({
      ...userTemp,
      userId: randId,
      active: true,
      userName: players[i],
    })
  }
  initGame.value = false

  game.value[0].active = true

  resetDice()
}

function selectDie(id) {
  dice.value = dice.value.map((die) => {
    if (die.id === id) {
      return { ...die, selected: !die.selected }
    } else {
      return { ...die }
    }
  })
}

function closeScore() {
  scoreSubmitting.value = false
}

function rollDice() {
  scoreSubmitting.value = false
  if (rolls.value < 3) {
    dice.value = dice.value.map((die) => {
      const randomInt = Math.floor(Math.random() * 6) + 1
      if (!die.selected) {
        return { ...die, val: randomInt }
      } else {
        return { ...die }
      }
    })
    rolls.value += 1
  } else {
    return
  }
}

function submitTurn(userId) {
  scoreSubmitting.value = true
  const result = dice.value.map((elem) => elem.val)
  const activeUser = game.value.filter((user) => user.userId === userId)[0]

  scoreOptions.value = activeUser.score.map((elem) => {
    if (!elem.submitted) {
      return {
        ...elem,
        score: elem.getScore(result),
      }
    } else {
      return { ...elem }
    }
  })
}

// function that will be applied to each score option
// needs to know it's own score id I think

function submitScore(id, userId) {
  console.log(userId)
  scoreSubmitting.value = false
  const chosenScore = scoreOptions.value.filter((option) => option.id === id)[0]

  const activeUser = game.value.filter((user) => user.userId === userId)[0]

  const activeUserIndex = game.value.findIndex((user) => user.userId === userId)

  const numPlayers = game.value.length

  // mutate the active users scoreboard
  const userScoreUpdate = activeUser.score.map((prevScore) => {
    if (prevScore.id === chosenScore.id) {
      return { ...prevScore, score: chosenScore.score, submitted: true }
    } else {
      return { ...prevScore }
    }
  })
  // insert the users updated scoreboard into the overall game object
  // and set their active status to false
  game.value = game.value.map((userGame) => {
    if (userGame.userId === userId) {
      return { ...userGame, score: userScoreUpdate, active: false }
    } else {
      return { ...userGame }
    }
  })

  // set next active player
  // if we are on the final player go to the start
  if (activeUserIndex === numPlayers - 1) {
    game.value[0].active = true
  } else {
    game.value[activeUserIndex + 1].active = true
  }

  resetDice()
}

export default function useState() {
  return {
    dice,
    rolls,
    selectDie,
    rollDice,
    submitTurn,
    scoreOptions,
    scoreSubmitting,
    closeScore,
    submitScore,
    game,
    initGame,
    startGame,
  }
}
