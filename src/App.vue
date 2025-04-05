<template>
  <div class="tetris-app">
    <AppHeader />
    <AppMain />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppMain from '@/components/AppMain.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<style lang="scss">
.tetris-app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
