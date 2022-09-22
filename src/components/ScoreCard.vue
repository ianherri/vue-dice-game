<template>
  <div>{{ props.user.userId }}</div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  user: Object,
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
