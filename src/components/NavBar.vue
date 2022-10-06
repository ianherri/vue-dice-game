<template>
  <div
    class="sticky flex flex-row gap-2 bg-white py-2 px-4 rounded w-max border border-slate-100"
  >
    <router-link :to="home"> Home </router-link>
    <div v-if="loggedIn">
      <router-link :to="profile"> Profile </router-link>
      <router-link :to="logout"> Logout </router-link>
    </div>
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
