<template>
  <div>How many players are playing the game?</div>
  <form>
    <input placeholder="add a player" v-model="player" />
    <button @click.prevent="addPlayer()">add player</button>
    <br />
    <br />
    <button @click.prevent="props.startGame(players)">start!</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
  startGame: Function,
})

const players = []

const player = ref('')

function addPlayer() {
  players.push(player.value)
  console.log(players)
  player.value = ''
}
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
