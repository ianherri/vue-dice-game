<template>
  <div>How many players are playing the game?</div>
  <form class="init-game-form">
    <div class="add-player-input-container">
      <input
        class="add-player-input"
        placeholder="add a player"
        v-model="player"
      />
      <button class="secondary-button" @click.prevent="addPlayer()">
        add player
      </button>
    </div>
    <div>
      Players:
      <li v-for="player in players" :key="player.id">{{ player }}</li>
    </div>
    <button class="primary-button" @click.prevent="props.startGame(players)">
      {{ players.length > 0 ? 'start game for ' + players.length : 'start' }}
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
  startGame: Function,
})

const players = ref([])

const player = ref('')

function addPlayer() {
  players.value.push(player.value)
  player.value = ''
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.init-game-form {
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 10px;
  background-color: rgb(246, 246, 246);
}

.add-player-input {
  border: 1px solid lightgrey;
  border-radius: 4px;
  padding: 2px 8px 2px 8px;
}

li {
  list-style: none;
  padding-left: 12px;
}
</style>
