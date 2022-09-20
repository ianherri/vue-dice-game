<template>
  <div class="App">
    <h1>Welcome to the game!</h1>
    <div class="App-board">
      <div v-for="die in dice" :key="die.id">
        <DieComponent
          :val="die.val"
          :selected="die.selected"
          :selectDie="selectDie"
          :id="die.id"
        />
      </div>
    </div>
    <button @click.prevent="randomizeDice">Roll Dice</button>
  </div>
</template>

<script setup>
import DieComponent from './components/DieComponent.vue'
import useState from './composable/state'
const { dice, selectDie, randomizeDice } = useState()
</script>

<style>
.App {
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  max-width: 500px;
}

.App-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
}
</style>
