<template>
  <div class="flex flex-col gap-2 bg-white rounded py-12 px-10 space-y-4">
    <h1 class="font-semibold text-xl">Welcome to Yahtzee!!</h1>
    <div>
      <button
        class="rounded bg-indigo-100 hover:bg-indigo-300 px-2 text-base"
        @click.prevent="handleStartGame"
      >
        Start New Game
      </button>
    </div>
    <h3 class="font-semibold text-base">
      You have {{ games.length }} available games:
    </h3>
    <div class="flex flex-col gap-6">
      <div v-for="game in games" :key="game._id">
        <JoinGameComponent :game="game" :userId="user.userId" />
      </div>
    </div>
  </div>
</template>

<script setup>
import useAuth from '@/composable/auth'
import { onMounted } from 'vue'
import useState from '@/composable/state'
import JoinGameComponent from '@/components/JoinGameComponent.vue'

const { user, checkAuth } = useAuth()
const { startGame, getAllGames, games } = useState()

onMounted(async () => {
  await checkAuth()
  await getAllGames()
})

async function handleStartGame() {
  await startGame(user.value.userId)
  await getAllGames()
}
</script>

<style></style>
