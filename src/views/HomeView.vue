<template>
  <div class="App">
    <h1>YAHTZEE!!</h1>
    <InitGame :startGame="startGame" />
  </div>
</template>

<script setup>
import useState from '../composable/state'

import InitGame from '../components/InitGame.vue'

const { startGame } = useState()
</script>

<style>
.App {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  max-width: 500px;
}

.app-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
}

.score-select {
  background-color: antiquewhite;
  border-radius: 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  box-shadow: 10px 10px salmon;
}

.primary-button {
  padding: 4px 8px 4px 8px;
  background-color: aqua;
  border-radius: 4px;
  width: 100%;
  margin: 10px 0px 10px 0px;
  border: none;
  box-shadow: 1px 1px salmon;
  transition: all 200ms;
}

.primary-button:hover {
  cursor: pointer;
  box-shadow: 4px 4px salmon;
}

.secondary-button {
  padding: 4px 8px 4px 8px;
  background-color: rgb(255, 200, 151);
  border-radius: 4px;
  border: none;
  margin: 10px 0px 10px 10px;
  box-shadow: 1px 1px rgb(183, 141, 255);
  transition: all 200ms;
}

.secondary-button:hover {
  cursor: pointer;
  background-color: rgb(255, 200, 151);
  box-shadow: 4px 4px rgb(183, 141, 255);
}
</style>
