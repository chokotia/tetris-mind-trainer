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
          <div v-if="!hasResults" class="text-center py-3 text-muted">
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
            <div class="d-flex align-items-center">
              <span v-if="index === 0">0手目: 初期状態</span>
              <template v-else-if="result.move">
                <span class="me-2">{{ index }}手目:</span>
                <span
                  class="move-label me-1"
                  :class="`bg-label-${result.move.location.type}`"
                >
                  {{ result.move.location.type }}
                </span>
                <div class="d-flex flex-column">
                  <small>
                    {{ result.move.location.orientation }}
                    {{ getPositionRangeDisplay(result.move.location) }}
                  </small>
                </div>
              </template>
            </div>
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
            選択した手を適用
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
import type { AIResultType, PieceLocationType } from '@/types/aiTypes';
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

// 位置の範囲表示を取得（x, y座標の範囲を一度に計算）
const getPositionRangeDisplay = (location: PieceLocationType): string => {
  if (!location.blockPositions || location.blockPositions.length === 0) {
    return `x:${location.x}-?, y:${location.y}-?`;
  }

  const xValues = location.blockPositions.map((pos) => location.x + pos.x);
  const yValues = location.blockPositions.map((pos) => location.y + pos.y);

  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  return `x:${minX}-${maxX}, y:${minY}-${maxY}`;
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

.move-label {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: 12px;
}

.bg-label-I {
  background-color: var(--color-piece-i);
  color: #000;
}

.bg-label-O {
  background-color: var(--color-piece-o);
  color: #000;
}

.bg-label-T {
  background-color: var(--color-piece-t);
}

.bg-label-L {
  background-color: var(--color-piece-l);
  color: #000;
}

.bg-label-J {
  background-color: var(--color-piece-j);
}

.bg-label-S {
  background-color: var(--color-piece-s);
  color: #000;
}

.bg-label-Z {
  background-color: var(--color-piece-z);
}
</style>
