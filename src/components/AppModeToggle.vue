<template>
  <div class="mode-toggle-container">
    <div class="mode-toggle-label" :class="{ 'active': !isAiMode }"></div>
    <div
      class="mode-toggle"
      @click="toggleMode"
      role="switch"
      :aria-checked="isAiMode"
      tabindex="0"
      @keydown.space.prevent="toggleMode"
    >
      <div class="toggle-track">
        <div class="toggle-track-edit">
          <i class="bi bi-pencil-fill"></i>
        </div>
        <div class="toggle-track-ai">
          <i class="bi bi-robot"></i>
        </div>
      </div>
      <div class="toggle-slider" :class="{ 'ai-active': isAiMode }"></div>
    </div>
    <div class="mode-toggle-label" :class="{ 'active': isAiMode }"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isAiMode = computed(() => store.getters['appMode/isAiMode']);

const toggleMode = () => {
  store.dispatch('appMode/toggleMode');
};
</script>

<style scoped>
.mode-toggle-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mode-toggle-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.3s;
}

.mode-toggle-label.active {
  color: #fff;
  font-weight: 600;
}

.mode-toggle {
  position: relative;
  width: 64px;
  height: 32px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.toggle-track {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 6px 8px;
  box-sizing: border-box;
  color: white;
}

.toggle-track-edit, .toggle-track-ai {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  z-index: 1;
}

.toggle-track-edit i, .toggle-track-ai i {
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.toggle-slider {
  position: absolute;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #5cb85c 0%, #449d44 100%);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  left: 0;
  top: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.toggle-slider.ai-active {
  transform: translateX(32px);
  background: linear-gradient(135deg, #337ab7 0%, #2e6da4 100%);
}

/* アクティブモードのアイコンを強調 */
.toggle-slider:not(.ai-active) ~ .toggle-track .toggle-track-edit i {
  opacity: 1;
}

.toggle-slider.ai-active ~ .toggle-track .toggle-track-ai i {
  opacity: 1;
}
</style>
