<template>
  <div>How many players are playing the game?</div>
  <form>
    <select v-model="numPlayers" name="players" id="players">
      <option value="1">one</option>
      <option value="2">two</option>
      <option value="3">three</option>
      <option value="4">four</option>
    </select>
    <button @click.prevent="props.startGame(numPlayers)">start!</button>
  </form>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  startGame: Function,
})

const numPlayers = 1
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Die {
  box-sizing: border-box;
  display: block;
  text-align: center;
  background-color: #f08080;
  padding: 25px;
  border-radius: 10px;
  margin: 10px;
}
.Die:hover {
  cursor: pointer;
}
</style>
