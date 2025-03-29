<template>
  <header class="header navbar navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <div class="d-flex align-items-center justify-content-between w-100">
        <div class="d-flex align-items-center">
          <button
            id="new-problem-button"
            class="btn btn-outline-light me-2"
            type="button"
            aria-label="新しい問題を生成する"
          >
            <i class="bi bi-file-earmark-plus"></i>
          </button>
          <button
            id="reset-board"
            class="btn btn-outline-light me-2"
            type="button"
            aria-label="現在の問題を最初から行う"
          >
            <i class="bi bi-arrow-repeat"></i>
          </button>
        </div>
        <div class="d-flex align-items-center">
          <button
            id="ask-ai-button"
            class="btn btn-outline-light me-2"
            type="button"
            aria-label="AIに最適な手を求める"
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SettingsModal from '@/components/SettingsModal.vue';

const settingsModalRef = ref<InstanceType<typeof SettingsModal> | null>(null);

const openSettingsModal = () => {
  settingsModalRef.value?.open();
};
</script>

<style lang="scss">
.header {
  height: var(--layout-header-height);
  min-height: var(--layout-header-height);
}
</style>
