<template>
  <div>
    <div v-if="!loading">
      <div v-if="!gameMember">
        <div>you are not in this game, return to profile page to join</div>
      </div>
      <div class="flex flex-row flex-wrap gap-4 items-stretch" v-else>
        <div
          class="flex flex-col gap-1 h-fit backdrop-blur-md bg-white/30 rounded py-12 px-10 grow"
        >
          <h1 class="font-semibold text-white text-2xl">
            Game {{ gameId[0] }}
          </h1>
          <h3 class="text-white my-4">Players:</h3>
          <div class="flex flex-row flex-wrap gap-2">
            <div v-for="user in users" :key="user">
              <UserIcon :user="user" />
            </div>
          </div>
          <div class="text-white my-4">
            it is
            {{ yourTurn ? `your turn` : `not your turn` }}
          </div>
        </div>
        <div
          id="dice-board"
          class="flex flex-col gap-1 h-fit backdrop-blur-md bg-white/30 rounded py-12 px-10 grow"
        >
          <h2 class="font-semibold text-white text-xl">Dice board</h2>
          <div class="flex flex-col gap-2 my-4">
            <div
              v-for="die in game.dice"
              :key="die.id"
              :class="dynamicStyle(die.value) + ' transition-all'"
            >
              <DieComponent
                :id="die.id"
                :value="die.value"
                :selected="die.selected"
              />
            </div>
          </div>
          <button
            class="rounded-md text-white border border border-white px-4 py-1 hover:bg-white/10"
            @click.prevent="handleRollDice"
          >
            Roll Dice
          </button>
        </div>

        <div
          class="flex flex-col gap-1 backdrop-blur-md bg-white/30 rounded py-12 px-10 grow"
          id="scorecard"
          :class="dynamicSize.scorecard"
          @click.prevent="makeBigger"
        >
          <h2 class="font-semibold text-white text-xl">Your Scorecard</h2>
          <ScoreCard :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import useState from '../composable/state'
import useAuth from '@/composable/auth'
import DieComponent from '../components/DieComponent.vue'
import ScoreCard from '@/components/ScoreCard.vue'
import UserIcon from '@/components/UserIcon.vue'

const {
  getSingleGameForUser,
  game,
  loading,
  rollDice,
  calculatePossibleScores,
  activeUserData,
  resetDice,
  rolls,
} = useState()

const { user, checkAuth } = useAuth()
const route = useRoute()
const gameId = route.params.id
const turnNum = ref(0)
const yourTurn = ref(false)
const gameMember = ref(false)
const users = ref()
const dynamicSize = ref()

const dynamicStyle = (val) => {
  if (val < 2) {
    return 'w-1/6'
  }
  if (val < 3) {
    return 'w-2/6'
  }
  if (val < 4) {
    return 'w-3/6'
  }
  if (val < 5) {
    return 'w-4/6'
  }
  if (val < 6) {
    return 'w-5/6'
  } else {
    return 'w-full'
  }
}

onMounted(async () => {
  await checkAuth()
  await getSingleGameForUser(gameId, user.value.userId)
  if (game.value) {
    resetDice()
    turnNum.value = game.value.users[0].scoreCard.filter(
      (score) => score.submitted
    ).length
    gameMember.value = true
    yourTurn.value = user.value.userId === activeUserData.value.userId
    users.value = game.value.users.map((user) => user.userId)
  } else {
    gameMember.value = false
    yourTurn.value = false
  }
  dynamicSize.value = { scorecard: '', diceboard: '' }
  console.log(rolls.value)
})

function handleRollDice() {
  rolls.value += 1
  if (rolls.value < 4) {
    rollDice()
    calculatePossibleScores()
    yourTurn.value = user.value.userId === activeUserData.value.userId
  }
}

function makeBigger(e) {
  console.log(e.target)
  console.log(e.target.id)
  if (e.target.id === 'scorecard' && dynamicSize.value.scorecard === '') {
    dynamicSize.value = { scorecard: 'w-full', diceboard: '' }
  }
  if (e.target.id === 'dice-board' && dynamicSize.value.diceboard === '')
    dynamicSize.value = { scorecard: '', diceboard: 'w-full' }
  else {
    dynamicSize.value = { scorecard: '', diceboard: '' }
  }
}
</script>

<style></style>
