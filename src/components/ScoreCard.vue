<template>
  <div v-if="!loading">
    <div class="grid grid-cols-1 gap-2">
      <div class="grid grid-cols-3 gap-2 font-semibold text-l">
        <div>Name</div>
        <div>Score</div>
        <div></div>
      </div>
      <div
        class="grid grid-cols-3 gap-2"
        v-for="score in userData.scoreCard"
        :key="score.id"
      >
        <div class="mr-4" :class="scoreActiveStyles(score)">
          {{ score.name }}
        </div>
        <div>{{ score.score }}</div>
        <div>
          <button
            class="rounded bg-rose-300 hover:bg-rose-500 px-2 disabled:bg-slate-50 disabled:text-slate-300"
            :disabled="score.submitted"
            @click.prevent="handleSelectScore(score.id)"
          >
            select
          </button>
        </div>
      </div>
      <button
        class="rounded bg-slate-300 hover:bg-rose-500 px-2 mt-4"
        @click.prevent="handleSubmitScore"
      >
        Submit score
      </button>
    </div>
  </div>
</template>

<script setup>
import useState from '../composable/state'

const { loading, userData, selectScoreForSubmission, submitTurn } = useState()

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
