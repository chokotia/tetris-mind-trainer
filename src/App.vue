<template>
  <div class="tetris-app">
    <AppHeader />
    <AppMain />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import AppHeader from '@/components/AppHeader.vue';
import AppMain from '@/components/AppMain.vue';
import AppFooter from '@/components/AppFooter.vue';
import problemGenerator from '@/services/problemGenerator';

const store = useStore();

onMounted(() => {
  // アプリ起動時に新しい問題を生成
  problemGenerator.generateNewProblem(store);
});
</script>

<style lang="scss">
.tetris-app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
