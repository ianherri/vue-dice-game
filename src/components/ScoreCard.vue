<template>
  <div v-if="!loading">
    <div class="grid grid-cols-1 gap-2 my-4">
      <div class="grid grid-cols-3 gap-2 font-semibold text-l">
        <h3 class="col-span-2 text-white font-normal">Name:</h3>
        <h3 class="text-white font-normal">Score:</h3>
      </div>
      <div
        class="grid grid-cols-3 gap-2"
        v-for="score in userData.scoreCard"
        :key="score.id"
      >
        <div class="mr-4 col-span-2">
          <button
            class="rounded-md text-white border border border-white px-4 py-1 hover:bg-white/10 disabled:bg-white/20 disabled:text-slate-300"
            :class="scoreActiveStyles(score)"
            :disabled="score.submitted"
            @click.prevent="handleSelectScore(score.id)"
          >
            {{ score.name }}
          </button>
        </div>
        <div>{{ score.score }}</div>
      </div>
      <div class="grid grid-cols-3 gap-2 italic text-white">
        <div class="col-span-2">{{ completed }}</div>
        <div>{{ currentScore }}</div>
        <div></div>
      </div>
      <button
        class="rounded-md text-white border border border-white px-4 py-1 hover:bg-white/10"
        @click.prevent="handleSubmitScore"
      >
        Submit score
      </button>
    </div>
  </div>
</template>

<script setup>
import useState from '../composable/state'
import { computed } from 'vue'

const { loading, userData, selectScoreForSubmission, submitTurn } = useState()

const completed = computed(() => {
  const result = `
    ${userData.value.scoreCard.filter((s) => s.submitted).length} /
    ${userData.value.scoreCard.length}`
  return result
})

const currentScore = computed(() => {
  const submittedScores = userData.value.scoreCard.map((s) => {
    if (s.submitted) {
      return s.score
    } else {
      return 0
    }
  })
  const sum = submittedScores.reduce((prev, next) => prev + next, 0)
  return sum
})

function handleSelectScore(scoreId) {
  selectScoreForSubmission(scoreId)
}

function handleSubmitScore() {
  submitTurn(userData.value.userId)
}

function scoreActiveStyles(score) {
  if (score.submitted) {
    return 'line-through'
  }
  if (score.staged) {
    return 'underline'
  } else return ''
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
