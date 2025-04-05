<template>
  <BModal
    ref="modalRef"
    id="ai-modal"
    title="AI解析"
  >
    <div class="row">
      <div class="col-12 mb-3">
        <div id="ai-status-message" class="alert alert-info" role="alert">
          {{ statusMessage }}
        </div>
      </div>

      <div class="col-md-8">
        <h3 class="fs-6 mb-2">探索履歴</h3>
        <div class="list-group ai-history-container">
          <div v-if="hasResults" class="text-center py-3 text-muted">
            <em>まだ履歴がありません</em>
          </div>
          <div
            v-for="(result, index) in aiResults"
            :key="index"
            class="list-group-item d-flex justify-content-between align-items-center"
            :class="{ 'active': selectedMoveIndex === index }"
            role="button"
            tabindex="0"
            @click="selectMove(index)"
          >
            <span>{{ index === 0 ? '初期状態' : `${index}手目: ${result.action || '移動なし'}` }}</span>
            <span v-if="index > 0" class="badge bg-primary rounded-pill">
              {{ index }}
            </span>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="d-grid gap-2">
          <button
            class="btn btn-primary"
            type="button"
            @click="startSearch"
            :disabled="isSearching"
          >
            {{ isSearching ? '探索中...' : '探索開始' }}
          </button>
          <button
            class="btn btn-success"
            type="button"
            :disabled="!hasResults || selectedMoveIndex === null"
            @click="applyResults"
          >
            適用
          </button>
          <button
            class="btn btn-outline-danger"
            type="button"
            @click="resetHistory"
          >
            履歴リセット
          </button>
        </div>
      </div>
    </div>
  </BModal>
</template>

<script setup lang="ts">
import {
  ref, computed, defineExpose,
} from 'vue';
import { BModal } from 'bootstrap-vue-next';
import type { AIResultType } from '@/types/aiTypes';
import { useStore } from 'vuex';
import AIControllerWrapper from '../services/AIControllerWrapper';

const store = useStore();
const aiController = ref<AIControllerWrapper>(new AIControllerWrapper());
const modalRef = ref<InstanceType<typeof BModal> | null>(null);
const isSearching = ref<boolean>(false);
const selectedMoveIndex = ref<number | null>(null);

// モーダルを開く
const open = () => {
  modalRef.value?.show();
};

// AIの状態に関するステータスメッセージ
const statusMessage = computed<string>(() => {
  const status = aiController.value.getStatus();
  const message = aiController.value.getStatusMessage();
  return message ? `${status} (${message})` : status;
});

// AI結果
const aiResults = computed<AIResultType[]>(() => store.getters['aiResults/getMoves']);
const hasResults = computed<boolean>(() => aiResults.value.length > 0);

// 移動を選択
const selectMove = (index: number): void => {
  selectedMoveIndex.value = index;
};

// 探索開始
const startSearch = async (): Promise<void> => {
  isSearching.value = true;
  await aiController.value.calculateMoves();
  isSearching.value = false;
};

// 結果を適用
const applyResults = (): void => {
  if (selectedMoveIndex.value === null) return;

  store.commit('aiResults/setMoveIndex', selectedMoveIndex.value);

  // 盤面状態を更新
  const move: AIResultType | null = JSON.parse(JSON.stringify(store.getters['aiResults/getCurrentMove']));
  if (move) {
    store.commit('tetrisBoard/SET_TETRIS_BOARD', move.board);
    store.commit('tetrisBoard/SET_NEXT_MINO', move.next);
    store.commit('tetrisBoard/SET_HOLD_MINO', move.hold);
  }

  // 適用後にモーダルを閉じる
  modalRef.value?.hide();
};

// 履歴リセット
const resetHistory = (): void => {
  store.commit('aiResults/clearResults');
  selectedMoveIndex.value = null;
};

defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.ai-history-container {
  max-height: 400px;
  overflow-y: auto;
}

.list-group-item {
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &.active {
    background-color: #0d6efd;
    color: white;

    .badge {
      background-color: white !important;
      color: #0d6efd !important;
    }
  }
}
</style>
