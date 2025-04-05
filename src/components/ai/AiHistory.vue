<template>
  <div class="ai-history-container">
    <h3 class="fs-6 mb-2">探索履歴</h3>
    <div class="list-group">
      <div v-if="!hasResults" class="text-center py-3 text-muted">
        <em>まだ履歴がありません</em>
      </div>
      <div
        v-for="(result, index) in results"
        :key="index"
        class="list-group-item d-flex justify-content-between align-items-center"
        :class="{ 'active': selectedIndex === index }"
        role="button"
        tabindex="0"
        @click="onSelectMove(index)"
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
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { PropType } from 'vue';
import type { AIResultType } from '@/types/aiTypes';
import getPositionRangeDisplay from '@/utils/AiMoveUtils';

defineProps({
  results: {
    type: Array as PropType<AIResultType[]>,
    required: true,
  },
  selectedIndex: {
    type: Number,
    default: undefined,
  },
  hasResults: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['select-move']);

const onSelectMove = (index: number) => {
  emit('select-move', index);
};
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
