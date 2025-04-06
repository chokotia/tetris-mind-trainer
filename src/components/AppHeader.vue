<template>
  <header class="app-header navbar navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <div class="d-flex align-items-center justify-content-between w-100">
        <AppModeToggle class="ms-2" />
        <div class="text-white">debug ver. 0.2</div>
        <div class="d-flex align-items-center">
          <button
            id="new-problem-button"
            class="btn btn-outline-light me-2"
            type="button"
            aria-label="新しい問題を生成する"
            @click="handleNewProblemClick"
          >
            <i class="bi bi-file-earmark-plus me-1"></i>
          </button>
          <button
            id="ask-ai-button"
            class="btn btn-outline-light me-2"
            type="button"
            aria-label="AIに最適な手を求める"
            @click="openAiModal"
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

  <!-- 確認モーダル -->
  <BModal
    ref="confirmModalRef"
    title=""
    ok-title="削除"
    cancel-title="キャンセル"
    @ok="generateNewProblem"
    ok-variant="danger"
    cancel-variant="outline-secondary"
    centered
    hide-header-close
    class="modal-material"
    size="sm"
  >
    <div class="d-flex flex-column p-2">
      <div class="d-flex align-items-center mb-3">
        <i class="bi bi-exclamation-circle text-danger me-3"></i>
        <h5 class="modal-title fw-normal m-0">AI履歴があります</h5>
      </div>
      <p class="text-muted mb-0">
        新しい問題を生成すると現在のAI履歴が削除されます
      </p>
    </div>
  </BModal>

  <!-- アラート通知 -->
  <div
    v-if="showAlert"
    class="position-fixed bottom-0 start-0 p-3"
    style="z-index: 5"
  >
    <div
      class="material-toast d-flex align-items-center"
      role="alert"
    >
      <i class="bi bi-info-circle text-primary me-3"></i>
      <span>{{ alertMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import SettingsModal from '@/components/SettingsModal.vue';
import AiModal from '@/components/AiModal.vue';
import AppModeToggle from '@/components/AppModeToggle.vue';
import { BModal } from 'bootstrap-vue-next';
import problemGenerator from '@/services/problemGenerator';

const store = useStore();
const hasAiResults = computed(() => store.getters['aiResults/getMoves'].length > 0);

const settingsModalRef = ref<InstanceType<typeof SettingsModal> | null>(null);
const aiModalRef = ref<InstanceType<typeof AiModal> | null>(null);
const confirmModalRef = ref<InstanceType<typeof BModal> | null>(null);
const showAlert = ref(false);
const alertMessage = ref('');

const openSettingsModal = () => {
  settingsModalRef.value?.open();
};

const openAiModal = () => {
  aiModalRef.value?.open();
};

// 新しい問題ボタンのクリックハンドラ
const handleNewProblemClick = () => {
  // AI履歴がある場合は確認モーダルを表示
  if (hasAiResults.value) {
    confirmModalRef.value?.show();
  } else {
    // 履歴がない場合は直接生成
    problemGenerator.generateNewProblem(store);
  }
};

// 新しい問題を生成する関数
const generateNewProblem = () => {
  // AI結果の履歴がある場合はクリア
  if (hasAiResults.value) {
    store.commit('aiResults/clearResults');
    alertMessage.value = 'AI履歴を削除しました。新しい問題が生成されました。';
    showAlert.value = true;
    // 5秒後に自動的に非表示にする
    setTimeout(() => {
      showAlert.value = false;
    }, 3000);
  }

  // 問題生成
  problemGenerator.generateNewProblem(store);
};
</script>

<style lang="scss">
.app-header {
  height: var(--layout-header-height);
  min-height: var(--layout-header-height);
}

// マテリアルデザイン風モーダル
.modal-material {
  .modal-content {
    border-radius: 4px;
    border: none;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .modal-body {
    padding: 24px;
  }

  .modal-title {
    font-size: 18px;
    color: #212121;
  }

  .modal-footer {
    border-top: none;
    padding: 8px 24px 16px;

    .btn {
      border-radius: 4px;
      padding: 8px 16px;
      font-weight: 500;
      text-transform: uppercase;
      font-size: 14px;
      letter-spacing: 0.5px;

      &.btn-danger {
        background-color: #f44336;
        border-color: #f44336;

        &:hover {
          background-color: darken(#f44336, 5%);
          border-color: darken(#f44336, 5%);
        }
      }

      &.btn-outline-secondary {
        color: #2196f3;
        border-color: transparent;
        background-color: transparent;

        &:hover {
          background-color: rgba(33, 150, 243, 0.08);
        }
      }
    }
  }
}

// マテリアルトースト
.material-toast {
  background-color: #323232;
  color: white;
  padding: 16px 24px;
  border-radius: 4px;
  min-width: 280px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  animation: slideIn 0.2s ease-out;

  i {
    font-size: 20px;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
