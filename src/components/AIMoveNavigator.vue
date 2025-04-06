<template>
  <div class="ai-move-navigator">
    <!-- 1行目: 棋譜表示 -->
    <div v-if="currentMove" class="current-move">
      <div class="move-content" v-if="moveIndex === 0">
        <span class="move-indicator">0手目: 初期状態</span>
      </div>
      <div class="move-content" v-else-if="currentMove.move">
        <span
          class="move-label me-2"
          :class="`bg-label-${currentMove.move.location.type}`"
        >
          {{ currentMove.move.location.type }}
        </span>
        <span class="move-indicator">{{ getMoveIndicator }}</span>
      </div>
      <div class="move-content" v-else>
        <span class="move-indicator">手の情報がありません</span>
      </div>
    </div>
    <div v-else class="no-move">
      <span class="invisible">AI手なし</span>
    </div>

    <!-- 2行目: ナビゲーションボタン -->
    <div class="navigation-buttons">
      <button
        class="btn-first"
        @click="goToFirst"
        :disabled="!moveIndex || moveIndex <= 0"
        aria-label="最初の手に戻る"
      >
        <i class="bi bi-skip-backward"></i>
      </button>
      <button
        class="btn-nav btn-prev"
        :disabled="!hasPrevious"
        @click="goToPrevious"
        aria-label="AIの手を一手戻す"
      >
        <i class="bi bi-chevron-left"></i>
      </button>
      <button
        class="btn-nav btn-next"
        :disabled="!hasNext"
        @click="goToNext"
        aria-label="AIの手を一手進める"
      >
        <i class="bi bi-chevron-right"></i>
      </button>
      <button
        class="btn-first"
        @click="goToLast"
        :disabled="!hasNext"
        aria-label="最後の手に進む"
      >
        <i class="bi bi-skip-forward"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import getPositionRangeDisplay from '@/utils/AiMoveUtils';
import useAiMoveApply from '@/composables/useAiMoveApply';

const store = useStore();
const {
  applyMoveByIndex, moveToPrevious, moveToNext, moveToFirst, moveToLast,
} = useAiMoveApply();

const currentMove = computed(() => store.getters['aiResults/getCurrentMove']);
const moveIndex = computed(() => store.getters['aiResults/getMoveIndex']);
const hasPrevious = computed(() => store.getters['aiResults/canMovePrevious']);
const hasNext = computed(() => store.getters['aiResults/canMoveNext']);

const getMoveIndicator = computed(() => {
  if (!currentMove.value || !currentMove.value.move) return '';

  const { move } = currentMove.value;
  const { location } = move;
  const moveNumber = moveIndex.value !== null ? moveIndex.value : 0;
  const positionDisplay = getPositionRangeDisplay(location);

  return `${moveNumber}手目: ${location.orientation}, ${positionDisplay}`;
});

// 最初の手に移動する
const goToFirst = async () => {
  await moveToFirst();
};

// 前の手に移動する
const goToPrevious = async () => {
  await moveToPrevious();
};

// 次の手に移動する
const goToNext = async () => {
  await moveToNext();
};

// 最後の手に移動する
const goToLast = async () => {
  await moveToLast();
};

// 初期表示時に現在の手を適用
watch(currentMove, async (newMove) => {
  if (newMove && moveIndex.value !== null) {
    await applyMoveByIndex(moveIndex.value);
  }
}, { immediate: true });
</script>

<style scoped>
.ai-move-navigator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.current-move {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  min-width: 280px;
  text-align: center;
}

.move-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-move {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  min-width: 280px;
  text-align: center;
}

.move-indicator {
  font-weight: 500;
  font-size: 0.9rem;
}

/* ナビゲーションボタンのスタイル */
.navigation-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
}

.btn-nav {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-nav:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
}

.btn-nav:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-first {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-first:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.2);
}

.btn-first:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ミノラベルのスタイル */
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

.invisible {
  opacity: 0;
}
</style>
