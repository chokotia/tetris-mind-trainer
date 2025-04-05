<template>
  <header class="app-header navbar navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <div class="d-flex align-items-center justify-content-between w-100">
        <AppModeToggle class="ms-2" />
        <div class="d-flex align-items-center">
          <button
            id="ask-ai-button"
            class="btn btn-outline-light me-2"
            type="button"
            aria-label="AIに最適な手を求める"
            @click="openAiModal"
            :disabled="isEditMode"
            :class="{ 'opacity-50': isEditMode }"
          >
            <i class="bi bi-robot"></i>
          </button>
          <button
            class="btn btn-outline-light d-flex align-items-center"
            type="button"
            aria-label="設定を開く"
            @click="openSettingsModal"
          >
            <i class="bi bi-gear"></i>
          </button>
        </div>
      </div>
    </div>
  </header>

  <SettingsModal
    ref="settingsModalRef"
  />
  <AiModal
    ref="aiModalRef"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import SettingsModal from '@/components/SettingsModal.vue';
import AiModal from '@/components/AiModal.vue';
import AppModeToggle from '@/components/AppModeToggle.vue';

const store = useStore();
const isEditMode = computed(() => store.getters['appMode/isEditMode']);

const settingsModalRef = ref<InstanceType<typeof SettingsModal> | null>(null);
const aiModalRef = ref<InstanceType<typeof AiModal> | null>(null);

const openSettingsModal = () => {
  settingsModalRef.value?.open();
};

const openAiModal = () => {
  aiModalRef.value?.open();
};
</script>

<style lang="scss">
.app-header {
  height: var(--layout-header-height);
  min-height: var(--layout-header-height);
}
</style>
