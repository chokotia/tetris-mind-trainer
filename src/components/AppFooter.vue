<template>
  <footer class="app-footer navbar navbar-dark bg-dark fixed-bottom">
    <div
      class="container-fluid d-flex justify-content-between align-items-center position-relative"
    >
      <DrawModeSelector v-if="isEditMode" />
      <AIMoveNavigator v-if="isAiMode" />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import DrawModeSelector from './DrawModeSelector.vue';
import AIMoveNavigator from './AIMoveNavigator.vue';

const store = useStore();
const isEditMode = computed(() => store.getters['appMode/isEditMode']);
const isAiMode = computed(() => store.getters['appMode/isAiMode']);
</script>

<style scoped>
.app-footer {
  height: var(--layout-footer-height);
  min-height: var(--layout-footer-height);
}
</style>
