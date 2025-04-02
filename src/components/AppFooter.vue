<template>
  <footer class="app-footer navbar navbar-dark bg-dark fixed-bottom">
    <div class="container-fluid">
      <DrawModeSelector />
    </div>
  </footer>
</template>

<script setup lang="ts">
import DrawModeSelector from './DrawModeSelector.vue';
</script>

<style scoped>
.app-footer {
  height: var(--layout-footer-height);
  min-height: var(--layout-footer-height);
}
</style>
