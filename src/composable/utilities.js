function scoreOne(arr) {
  return sumNum(arr, 1)
}
function scoreTwo(arr) {
  return sumNum(arr, 2)
}
function scoreThree(arr) {
  return sumNum(arr, 3)
}
function scoreFour(arr) {
  return sumNum(arr, 4)
}
function scoreFive(arr) {
  return sumNum(arr, 5)
}

function scoreSix(arr) {
  return sumNum(arr, 6)
}

function scoreChance(arr) {
  const ans = arr.reduce((elem, prevElem) => elem + prevElem, 0)
  return ans
}

function scoreFullHouse(arr) {
  let count = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }

  arr.map((elem) => {
    count[elem] += 1
  })

  let arrayVal = Object.values(count)

  if (arrayVal.includes(3) && arrayVal.includes(2)) {
    return 25
  } else {
    return 0
  }
}

function scoreFourKind(arr) {
  return scoreNumOfKind(arr, 4)
}

function scoreThreeKind(arr) {
  return scoreNumOfKind(arr, 3)
}

function scoreFiveKind(arr) {
  if (scoreNumOfKind(arr, 5) > 0) {
    return 50
  } else {
    return 0
  }
}

function scoreSmallStraight(arr) {
  let count = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
  arr.map((elem) => {
    count[elem] += 1
  })

  return 0
}

function scoreLargeStraight(arr) {
  let count = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
  arr.map((elem) => {
    count[elem] += 1
  })

  let arrayVal = Object.values(count)
  if (
    (arrayVal[0] === 0 || arrayVal[5] === 0) &&
    arrayVal.every((val) => val <= 1)
  ) {
    return 35
  } else {
    return 0
  }
}

function scoreNumOfKind(arr, num) {
  let count = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }

  arr.map((elem) => {
    count[elem] += 1
  })

  let arrayVal = Object.values(count)
  // fix for yahtzee
  if (arrayVal.includes(num)) {
    return arr.reduce((elem, prevElem) => elem + prevElem, 0)
  } else {
    return 0
  }
}

function sumNum(arr, num) {
  const numArr = arr.filter((elem) => elem === num)
  if (numArr) {
    return numArr.reduce((elem, prevElem) => elem + prevElem, 0)
  } else {
    return 0
  }
}

export function changeActiveUser(users, activeUserId) {
  const numUsers = users.length
  let index = 0
  while (users[index].userId != activeUserId) {
    index += 1
  }
  if (index < numUsers - 1) {
    users[index].active = false
    users[index + 1].active = true
  } else {
    users[index].active = false
    users[0].active = true
  }
}

export const scoretemplate = [
  { id: 0, name: 'ones', score: 0, submitted: false, staged: false },
  { id: 1, name: 'twos', score: 0, submitted: false, staged: false },
  { id: 2, name: 'threes', score: 0, submitted: false, staged: false },
  { id: 3, name: 'fours', score: 0, submitted: false, staged: false },
  { id: 4, name: 'fives', score: 0, submitted: false, staged: false },
  { id: 5, name: 'sixes', score: 0, submitted: false, staged: false },
  { id: 6, name: 'three of a kind', score: 0, submitted: false, staged: false },
  { id: 7, name: 'four of a kind', score: 0, submitted: false, staged: false },
  { id: 8, name: 'fullhouse', score: 0, submitted: false, staged: false },
  { id: 9, name: 'small straight', score: 0, submitted: false, staged: false },
  { id: 10, name: 'large straight', score: 0, submitted: false, staged: false },
  { id: 11, name: 'yahtzee', score: 0, submitted: false, staged: false },
  { id: 12, name: 'chance', score: 0, submitted: false, staged: false },
]

export const scoreMap = [
  { id: 0, getScore: scoreOne },
  { id: 1, getScore: scoreTwo },
  { id: 2, getScore: scoreThree },
  { id: 3, getScore: scoreFour },
  { id: 4, getScore: scoreFive },
  { id: 5, getScore: scoreSix },
  { id: 6, getScore: scoreThreeKind },
  { id: 7, getScore: scoreFourKind },
  { id: 8, getScore: scoreFullHouse },
  { id: 9, getScore: scoreSmallStraight },
  { id: 10, getScore: scoreLargeStraight },
  { id: 11, getScore: scoreFiveKind },
  { id: 12, getScore: scoreChance },
]

export class User {
  constructor(userId) {
    this.active = false
    this.userId = userId
    this.scoreCard = [...scoretemplate]
  }
}

export class Game {
  constructor(users, dice) {
    this.users = users
    this.dice = dice
    this.started = new Date()
  }
}

export class Die {
  constructor(value, selected) {
    this.value = value
    this.selected = selected
    this.id = Math.floor(Math.random() * 10000)
  }
  select() {
    this.selected = !this.selected
  }

  changeValue(value) {
    if (!this.selected) {
      this.value = value
    } else {
      this.value
    }
  }
}
