// takes in an array and a integer and returns
// sum of values in array equal to that integer
export function scoreOne(arr) {
  return sumNum(arr, 1)
}
export function scoreTwo(arr) {
  return sumNum(arr, 2)
}
export function scoreThree(arr) {
  return sumNum(arr, 3)
}
export function scoreFour(arr) {
  return sumNum(arr, 4)
}
export function scoreFive(arr) {
  return sumNum(arr, 5)
}

export function scoreSix(arr) {
  return sumNum(arr, 6)
}

function sumNum(arr, num) {
  const numArr = arr.filter((elem) => elem === num)
  if (numArr) {
    return numArr.reduce((elem, prevElem) => elem + prevElem, 0)
  } else {
    return 0
  }
}

export function scoreChance(arr) {
  const ans = arr.reduce((elem, prevElem) => elem + prevElem, 0)
  return ans
}

// function sumOfKind(arr, kind) {}

export function scoreFullHouse(arr) {
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

export function scoreFourKind(arr) {
  return scoreNumOfKind(arr, 4)
}

export function scoreThreeKind(arr) {
  return scoreNumOfKind(arr, 3)
}

export function scoreFiveKind(arr) {
  if (scoreNumOfKind(arr, 5) > 0) {
    return 50
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

export function scoreSmallStraight(arr) {
  let count = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
  arr.map((elem) => {
    count[elem] += 1
  })

  return 0
}

export function scoreLargeStraight(arr) {
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
