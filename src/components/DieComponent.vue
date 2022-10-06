<template>
  <div
    :style="style"
    class="rounded-xl px-4 py-2"
    @click.prevent="selectDie(props.id)"
  >
    {{ props.value }}
  </div>
</template>

<script setup>
// this component will render a game for a single user
// and let them roll dice (when it's their turn)
// add scores
// and view the overall scoreboard for the game

import { defineProps, computed } from 'vue'
import useState from '../composable/state'

const { selectDie } = useState()

const props = defineProps({
  value: Number,
  selected: Boolean,
  id: Number,
})

const style = computed(() => ({
  backgroundColor: props.selected ? '#ffd7a3' : '#f08080',
  outline: props.selected ? '2px solid green' : '',
}))
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
