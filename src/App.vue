<template>
  <div class="tetris-app">
    <header class="tetris-app__header navbar navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <button
            class="btn btn-outline-light me-2"
            type="button"
            aria-label="新しい問題を生成する"
          >
            <i class="bi bi-file-earmark-plus"></i>
          </button>
          <button
            class="btn btn-outline-light me-2"
            type="button"
            aria-label="現在の問題を最初から行う"
          >
            <i class="bi bi-arrow-repeat"></i>
          </button>
        </div>

        <div class="d-flex align-items-center">
          <button
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
    </header>

    <main class="tetris-app__main d-flex flex-column justify-content-center overflow-y-auto">
      <div class="board-container d-flex flex-row justify-content-center align-items-start">
        <div id="board" class="tetris-board"></div>
        <div class="d-flex flex-column ms-3">
          <aside id="hold" class="next-container mb-3"></aside>
          <aside id="next" class="next-container"></aside>
        </div>
      </div>
    </main>

    <footer class="control-panel navbar navbar-dark bg-dark fixed-bottom">
      <div class="container-fluid">
        <div class="d-flex justify-content-between w-100 mb-2">
          <div class="btn-group">
            <button
              class="btn btn-secondary edit-option"
              data-action="Del"
              type="button"
            >
              Del
            </button>
            <button
              class="btn btn-secondary edit-option"
              data-action="Gray"
              type="button"
            >
              Gray
            </button>
          </div>
        </div>
        <div class="d-flex justify-content-center w-100">
          <button
            class="btn btn-outline-light me-2"
            type="button"
            aria-label="盤面の表示/非表示を切り替える"
            data-toggle-target="board"
          >
            <i class="bi bi-eye-slash"></i>
          </button>
          <button
            class="btn btn-outline-light me-2"
            type="button"
            aria-label="AIの手を一手戻す"
            disabled
          >
            <i class="bi bi-chevron-left"></i>
          </button>
          <div class="ai-move-display d-flex align-items-center mx-3">
            <div id="ai-move-text"></div>
          </div>
          <button
            class="btn btn-outline-light me-2"
            type="button"
            aria-label="AIの手を一手進める"
            disabled
          >
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </footer>

    <SettingsModal ref="settingsModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SettingsModal from '@/components/SettingsModal.vue';
import '@/types/bootstrap';

export default defineComponent({
  name: 'App',
  components: {
    SettingsModal,
  },
  setup() {
    const settingsModal = ref<HTMLElement | null>(null);

    const openSettingsModal = () => {
      const modalElement = document.getElementById('settings-modal');
      if (modalElement && window.bootstrap?.Modal) {
        const bootstrapModal = new window.bootstrap.Modal(modalElement);
        bootstrapModal.show();
      }
    };

    return {
      settingsModal,
      openSettingsModal,
    };
  },
});
</script>

<style lang="scss">
.tetris-app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &__header {
    z-index: 1030;
  }

  &__main {
    flex: 1;
    padding-top: 56px;
    padding-bottom: 120px;
  }
}

.tetris-board {
  width: 300px;
  height: 600px;
  background-color: #212529;
  border: 2px solid #6c757d;
}

.next-container {
  width: 120px;
  height: 120px;
  background-color: #212529;
  border: 2px solid #6c757d;
}

.control-panel {
  z-index: 1030;
}
</style>
