<template>
  <div
    class="flex flex-col items-center bg-contain bg-hero bg-cover py-6 min-h-screen"
  >
    <div class="flex flex-col items-center w-2/4 gap-10 stretch">
      <NavBar />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>

<style></style>
