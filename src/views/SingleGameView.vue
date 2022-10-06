<template>
  <div>
    <div v-if="!loading">
      <div v-if="!gameMember">
        <button>Join Game</button>
      </div>
      <div v-else>
        <h1>Game between:</h1>
        <div v-for="user in users" :key="user">
          {{ user }}
        </div>
        <div>
          it is
          {{ yourTurn ? `your turn` : `not your turn` }}
        </div>
        <div>Turn: {{ turnNum }}</div>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-4 bg-white rounded py-12 px-10">
            <div class="flex flex-col gap-1">
              <div
                v-for="die in game.dice"
                :key="die.id"
                :class="dynamicStyle(die.value)"
              >
                <DieComponent
                  :id="die.id"
                  :value="die.value"
                  :selected="die.selected"
                />
              </div>
            </div>
            <button
              class="rounded bg-slate-300 hover:bg-rose-500 px-4 py-2 min-w-min"
              @click.prevent="handleRollDice"
            >
              Roll Dice
            </button>
          </div>

          <h2>{{ user.username }}'s Scorecard</h2>
          <div class="gap-1 bg-white rounded py-12 px-10">
            <ScoreCard :user="user" />
          </div>
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

const {
  getSingleGameForUser,
  game,
  loading,
  rollDice,
  calculatePossibleScores,
  activeUserData,
} = useState()

const { user, checkAuth } = useAuth()
const route = useRoute()
const gameId = route.params.id
const turnNum = ref(0)
const yourTurn = ref(false)
const gameMember = ref(false)
const users = ref()

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
    rollDice()
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
})

function handleRollDice() {
  rollDice()
  calculatePossibleScores()
  yourTurn.value = user.value.userId === activeUserData.value.userId
}
</script>

<style></style>
