<template>
  <div></div>
</template>

<script setup>
import { onMounted } from 'vue'
import useAuth from '../composable/auth'
import router from '../router/index'

const { logOut } = useAuth()

onMounted(async () => {
  await logOut()
  router.push({ name: 'home' })
})
</script>

<style></style>
