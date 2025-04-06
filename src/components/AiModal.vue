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
        <AiHistory
          :results="aiResults"
          :selected-index="selectedMoveIndex"
          :has-results="hasResults"
          @select-move="selectMove"
        />
      </div>

      <div class="col-md-4">
        <div class="d-grid gap-2 mt-3">
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
            :disabled="!hasResults || selectedMoveIndex === undefined"
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
import type { AIResultType } from '@/types/aiTypes';
import { useStore } from 'vuex';
import AIControllerWrapper from '@/services/AIControllerWrapper';
import AiHistory from '@/components/ai/AiHistory.vue';
import useAiMoveApply from '@/composables/useAiMoveApply';

const store = useStore();
const aiController = ref<AIControllerWrapper>(new AIControllerWrapper());
const modalRef = ref<InstanceType<typeof BModal> | null>(null);
const isSearching = ref<boolean>(false);
const selectedMoveIndex = ref<number | undefined>(undefined);

// AIの移動適用Composableを取得
const { applyMoveByIndex } = useAiMoveApply();

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
  if (selectedMoveIndex.value === undefined) return;

  // 共通化した関数を使用
  applyMoveByIndex(selectedMoveIndex.value).then((result) => {
    if (result) {
      // 適用後にモーダルを閉じる
      modalRef.value?.hide();
    }
  });
};

// 履歴リセット
const resetHistory = (): void => {
  // 直接Storeコミットを呼び出す
  store.commit('aiResults/clearResults');
  selectedMoveIndex.value = undefined;
};

defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
/* 共通のスタイルはmino-colors.scssに移動しました */
</style>
