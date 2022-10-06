<template>
  <div
    class="rounded py-6 px-5 cursor-pointer"
    :class="
      gameMember
        ? 'bg-green-100 hover:bg-green-300'
        : 'bg-amber-100 hover:bg-amber-300'
    "
    @click.prevent="handlePlayOrJoinGame"
  >
    <div class="flex flex-col gap-2">
      <h2 class="text-base font-bold">
        {{ gameMember ? 'play this game' : 'join this game' }}
      </h2>
      <div>Active players: {{ props.game.users.length }}</div>
      <div class="text-xs font-light">{{ formattedDate }}</div>
    </div>
  </div>
</template>

<script setup>
// this component will render a game for a single user
// and let them roll dice (when it's their turn)
// add scores
// and view the overall scoreboard for the game

import { defineProps } from 'vue'
import router from '../router/index'
import useState from '../composable/state'

const { joinGame } = useState()
const props = defineProps({
  game: Object,
  userId: String,
})

const gameMember = props.game.users.map((u) => u.userId).includes(props.userId)
const formattedDate = new Date(Date.parse(props.game.started)).toLocaleString()

async function handlePlayOrJoinGame() {
  if (gameMember) {
    router.push({ name: 'game', params: { id: props.game._id } })
  } else {
    await joinGame(props.userId, props.game._id)
    router.push({ name: 'game', params: { id: props.game._id } })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
