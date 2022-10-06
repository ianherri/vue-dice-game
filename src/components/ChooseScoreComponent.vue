<template>
  <div class="flex flex-row">
    <div class="Score-name">{{ props.name }}</div>
    <div class="Score-score">{{ props.score }}</div>
    <div>
      <button
        :disabled="props.submitted"
        class="Button-choose-score"
        @click.prevent="submitScore(props.id, props.userId)"
      >
        choose score
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// todo: find a way to receive a userId as a prop here.

const props = defineProps({
  score: Number,
  name: String,
  id: Number,
  submitScore: Function,
  userId: Number,
  submitted: Boolean,
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
