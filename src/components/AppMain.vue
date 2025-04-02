<template>
  <main class="app-main d-flex flex-column justify-content-center align-items-center">
    <div class="game-container d-flex flex-row justify-content-center align-items-start">
      <div class="board-container">
        <TetrisBoard />
      </div>
      <div class="hold-next-container">
        <TetrisHold />
        <TetrisNext />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import TetrisBoard from './TetrisBoard.vue';
import TetrisHold from './TetrisHold.vue';
import TetrisNext from './TetrisNext.vue';
</script>

<style scoped>
.app-main {
  padding-top: var(--layout-header-height);
  padding-bottom: var(--layout-footer-height);
  flex: 1;
  height: 100%;
  overflow: auto;
}

.game-container {
  gap: var(--game-elements-gap, 20px);
}

.board-container {
  min-height: 100%;
}

.hold-next-container {
  display: flex;
  flex-direction: column;
  gap: var(--game-elements-gap, 0px);
}
</style>
