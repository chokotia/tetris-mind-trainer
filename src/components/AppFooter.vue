<template>
  <footer class="app-footer navbar navbar-dark bg-dark fixed-bottom">
    <div
      class="container-fluid d-flex justify-content-between align-items-center position-relative"
    >
      <DrawModeSelector />
      <AIMoveNavigator />
    </div>
  </footer>
</template>

<script setup lang="ts">
import DrawModeSelector from './DrawModeSelector.vue';
import AIMoveNavigator from './AIMoveNavigator.vue';
</script>

<style scoped>
.app-footer {
  height: var(--layout-footer-height);
  min-height: var(--layout-footer-height);
}
</style>
