<template>
  <div class="border-2 border-white rounded-full px-2 py-1 text-white">
    {{ username }}
  </div>
</template>

<script setup>
import useAuth from '../composable/auth'
import { computed, defineProps } from 'vue'
const { user } = useAuth()

const props = defineProps({
  user: String,
})

const username = computed(() => {
  if (props.user === user.value.userId) {
    return user.value.username
  } else {
    return 'anon'
  }
})
</script>

<style></style>
