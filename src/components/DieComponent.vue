<template>
  <div :style="style" class="Die" @click.prevent="selectDie(id)">
    <h1>{{ props.val }}</h1>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const style = computed(() => ({
  backgroundColor: props.selected ? '#ffd7a3' : '#f08080',
  outline: props.selected ? '2px solid green' : '',
}))

const props = defineProps({
  val: Number,
  selected: Boolean,
  selectDie: Function,
  id: Number,
})

// const { val, selected } = toRefs(props)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Die {
  box-sizing: border-box;
  display: block;
  text-align: center;
  background-color: #f08080;
  padding: 25px;
  border-radius: 10px;
  margin: 10px;
}
.Die:hover {
  cursor: pointer;
}
</style>
