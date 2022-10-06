<template>
  <div class="flex flex-col items-center bg-slate-50 py-6 min-h-screen">
    <div class="flex flex-col items-center min-w-min max-w-2xl gap-10">
      <NavBar />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>

<style></style>
