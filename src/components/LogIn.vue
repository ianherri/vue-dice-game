<template>
  <div class="gap-1 bg-white rounded py-12 px-10">
    <h1 class="font-semibold text-xl">Welcome to Yahtzee!</h1>
    <h3>Login or Register below:</h3>
    <div>
      <form class="mt-8 space-y-6">
        <div class="grid gap-4 grid-cols-1 grid-rows-2r">
          <div>
            <input
              class="border rounded border-slate-200 px-1"
              v-model="user.username"
              type="text"
              name="username"
              placeholder="username"
            />
          </div>
          <div>
            <input
              class="border rounded border-slate-200 px-1"
              v-model="user.password"
              type="text"
              name="password"
              placeholder="password"
            />
          </div>
        </div>
        <div class="flex flex-row gap-3">
          <button
            class="rounded bg-rose-300 hover:bg-rose-500 px-2"
            @click.prevent="logIn(user.username, user.password)"
          >
            Log In
          </button>
          <button
            class="rounded bg-rose-300 hover:bg-rose-500 px-2"
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
