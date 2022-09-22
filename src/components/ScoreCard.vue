<template>
  <div>{{ props.user.userName }}: {{ score }}</div>
  <button @click.prevent="handleShowScoreCard">show scorecard</button>
  <div v-if="showScoreCard">
    <div>showing!</div>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue'

const showScoreCard = ref(false)

const props = defineProps({
  user: Object,
})

const score = computed(() => {
  return props.user.score
    .map((n) => n.score)
    .reduce((value, prevValue) => value + prevValue, 0)
})

function handleShowScoreCard() {
  showScoreCard.value = !showScoreCard.value
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
