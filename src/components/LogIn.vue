<template>
  <div class="gap-1 backdrop-blur-md bg-white/30 rounded shadow-xl py-24 px-20">
    <h1 class="font-semibold text-white text-2xl">Welcome to Yahtzee!</h1>
    <h3 class="text-white">Login or Register below:</h3>
    <div>
      <form class="mt-8">
        <div class="grid gap-4 grid-cols-1 grid-rows-2r">
          <div>
            <input
              class="border-none text-white rounded backdrop-blur-md bg-white/10 px-1 py-1 placeholder:text-white placeholder:font-light"
              v-model="user.username"
              type="text"
              name="username"
              placeholder="username"
            />
          </div>
          <div>
            <input
              class="border-none text-white rounded backdrop-blur-md bg-white/10 px-1 py-1 placeholder:text-white placeholder:font-light"
              v-model="user.password"
              type="text"
              name="password"
              placeholder="password"
            />
          </div>
        </div>
        <div class="flex flex-row gap-3 mt-6">
          <button
            class="rounded-md text-white border border border-white px-4 py-1 hover:bg-white/10"
            @click.prevent="logIn(user.username, user.password)"
          >
            Log In
          </button>
          <button
            class="rounded-md text-white border border border-white px-4 py-1 hover:bg-white/10"
            @click.prevent="registerUser(user.username, user.password)"
          >
            Register
          </button>
        </div>
      </form>

      <div>{{ message.length > 0 ? message : '' }}</div>
    </div>
  </div>
</template>

<script setup>
import useAuth from '../composable/auth'

const { user, message, logIn, registerUser } = useAuth()
</script>

<style></style>
