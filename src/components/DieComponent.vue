<template>
  <div
    :class="style"
    class="rounded-2xl px-4 py-2 text-white outline-white"
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

const style = computed(() => {
  if (props.selected) {
    return 'bg-white/10 outline-2'
  } else {
    return 'bg-white/30 outline-0'
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
