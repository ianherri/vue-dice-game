<template>
  <div>Create a new game</div>
  <form class="init-game-form">
    <button class="primary-button" @click.prevent="props.startGameNew()">
      start new game
    </button>
  </form>
</template>

<script setup>
import { defineProps } from 'vue'

// todo: identify user and add to the startGameNew function as a param

const props = defineProps({
  startGameNew: Function,
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
