<template>
  <div class="Score">
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
<style scoped>
.Score {
  width: 300px;
  display: flex;
  flex-direction: row;
  margin-top: 8px;

  padding: 2px 100px 2px 100px;
  border-bottom: 1px solid lightblue;
}

.Button-choose-score {
  width: 100px;
  background-color: rgb(208, 158, 255);
  border-radius: 4px;
  border: none;
}

.Score-score {
  margin-right: auto;
}

.Score-name {
  margin-right: auto;
}
</style>
