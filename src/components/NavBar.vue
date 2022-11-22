<template>
  <div
    class="sticky flex flex-row mx-2 backdrop-blur-md bg-white/30 py-2 px-4 rounded shadow self-stretch text-white gap-2"
  >
    <router-link :to="home"> Home </router-link>
    <router-link v-if="loggedIn" :to="profile"> Profile </router-link>
    <router-link v-if="loggedIn" class="ml-auto" :to="logout">
      Logout
    </router-link>
  </div>
</template>

<script setup>
import useAuth from '@/composable/auth'
import { onMounted } from 'vue'
import router from '../router/index'

const { user, checkAuth, loggedIn } = useAuth()

const [game, home, profile, logout] = router
  .getRoutes()
  .map((route) => route.name)

console.log(game)

onMounted(async () => {
  await checkAuth()
  console.log(user)
})
</script>

<style></style>
