<template>
  <div
    class="flex flex-col gap-1 backdrop-blur-md bg-white/30 rounded py-24 px-20"
  >
    <h1 class="font-semibold text-white text-2xl">
      Hello, {{ userNameProper }}
    </h1>
    <h3 class="text-white">
      Start a new game or select an existing game below:
    </h3>
    <div class="mt-6">
      <button
        class="rounded-md text-white border border border-white px-4 py-1 hover:bg-white/10"
        @click.prevent="handleStartGame"
      >
        Start New Game
      </button>
    </div>
    <h3 class="text-white mt-10">
      You have {{ games.length }} available games:
    </h3>
    <div class="flex flex-col gap-6 mt-6">
      <div v-for="game in games" :key="game._id">
        <JoinGameComponent :game="game" :userId="user.userId" />
      </div>
    </div>
  </div>
</template>

<script setup>
import useAuth from '@/composable/auth'
import { onMounted, ref } from 'vue'
import useState from '@/composable/state'
import JoinGameComponent from '@/components/JoinGameComponent.vue'

const { user, checkAuth } = useAuth()
const { startGame, getAllGames, games } = useState()
const userNameProper = ref('')

onMounted(async () => {
  await checkAuth()
  await getAllGames()
  userNameProper.value =
    user.value.username[0].toUpperCase() + user.value.username.slice(1)
})

async function handleStartGame() {
  await startGame(user.value.userId)
  await getAllGames()
}
</script>

<style></style>
