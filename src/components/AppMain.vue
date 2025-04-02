<template>
  <main class="app-main d-flex flex-column justify-content-center align-items-center">
    <div class="board-container d-flex flex-row justify-content-center align-items-center">
      <TetrisBoard ref="tetrisBoard" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TetrisBoard from './TetrisBoard.vue';

const tetrisBoard = ref();
</script>

<style scoped>
.app-main {
  padding-top: var(--layout-header-height);
  padding-bottom: var(--layout-footer-height);
  flex: 1;
  height: 100%;
  overflow: auto;
}

.board-container {
  min-height: 100%;
}
</style>
