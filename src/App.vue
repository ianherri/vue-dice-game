<template>
  <div class="App">
    <h1>YAHTZEE!!</h1>
    <div v-if="initGame">
      <InitGame :startGame="startGame" />
    </div>

    <div v-else>
      <p v-if="rolls > 0">Rolls: {{ rolls }}</p>
      <p>Turn: {{ activeUser.userName }}</p>
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
      <button @click.prevent="rollDice">Roll Dice</button>
      <button @click.prevent="submitTurn(activeUser.userId)">
        Submit Turn
      </button>
      <div class="Score-select" v-if="scoreSubmitting">
        <div v-for="score in scoreOptions" :key="score.id">
          <ChooseScoreComponent
            :name="score.name"
            :score="score.score"
            :submitted="score.submitted"
            :id="score.id"
            :submitScore="submitScore"
            :userId="activeUser.userId"
          />
        </div>
        <a class="button-close" @click.prevent="closeScore">close</a>
      </div>
      <div v-for="user in game" :key="user.userId">
        <ScoreCard :user="user" />
      </div>
    </div>
  </div>
</template>

<script setup>
import DieComponent from './components/DieComponent.vue'
import useState from './composable/state'
import ChooseScoreComponent from './components/ChooseScoreComponent.vue'
import InitGame from './components/InitGame.vue'
import ScoreCard from './components/ScoreCard.vue'

import { computed } from '@vue/reactivity'

const {
  scoreOptions,
  dice,
  selectDie,
  rollDice,
  submitTurn,
  rolls,
  scoreSubmitting,
  closeScore,
  submitScore,
  initGame,
  startGame,
  game,
} = useState()

const activeUser = computed(
  () => game.value.filter((user) => user.active === true)[0]
)
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

.Score-select {
  background-color: antiquewhite;
  border-radius: 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  box-shadow: 10px 10px salmon;
}

.button-close {
  padding: 5px;
  background-color: aqua;
  border-radius: 10px;
  margin-right: auto;
}

.button-close:hover {
  cursor: pointer;
}
</style>
