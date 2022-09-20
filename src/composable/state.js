import { ref, watch } from 'vue'

const dice = ref([
  { id: 1, val: 1, selected: false },
  { id: 2, val: 1, selected: false },
  { id: 3, val: 1, selected: false },
  { id: 4, val: 1, selected: false },
  { id: 5, val: 1, selected: false },
  { id: 6, val: 1, selected: false },
  { id: 7, val: 1, selected: false },
  { id: 8, val: 1, selected: false },
  { id: 9, val: 1, selected: false },
])

function selectDie(id) {
  dice.value = dice.value.map((die) => {
    if (die.id === id) {
      return { ...die, selected: !die.selected }
    } else {
      return { ...die }
    }
  })
}

function randomizeDice() {
  dice.value = dice.value.map((die) => {
    const randomInt = Math.floor(Math.random() * 6) + 1
    if (!die.selected) {
      return { ...die, val: randomInt }
    } else {
      return { ...die }
    }
  })
}

export default function useState() {
  watch(
    () => dice.value,
    () => {
      const allEqual = dice.value.every(
        (die) => die.val === dice.value[0].val && die.selected === true
      )
      if (allEqual) {
        window.alert('game over!')
      }
    }
  )
  return {
    dice,
    selectDie,
    randomizeDice,
  }
}
