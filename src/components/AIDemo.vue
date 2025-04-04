<template>
  <div class="ai-demo">
    <h2>AI Controller Demo vue3</h2>
    <div class="status">
      <h3>現在のステータス</h3>
      <p>ステータス: {{ status }}</p>
      <p>メッセージ: {{ message }}</p>
    </div>
    <div class="controls">
      <button @click="calculateMoves" :disabled="isCalculating">
        {{ isCalculating ? '計算中...' : '3手先を計算' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { GameState, MoveResult } from '@/types/aiTypes';
import AIController from '../services/core/ai/AIController';

const aiController = ref<AIController>(new AIController());
const isCalculating = ref<boolean>(false);

const status = computed<string>(() => aiController.value.getStatus());
const message = computed<string>(() => aiController.value.getStatusMessage());

const createInitialGameState = (): GameState => ({
  weightsName: 'default',
  board: Array(20).fill(null).map(() => Array(10).fill(null)),
  queue: ['I', 'O', 'T', 'L', 'J', 'S', 'Z'],
  hold: null,
  combo: 0,
  backToBack: false,
});

const calculateMoves = async (): Promise<void> => {
  if (isCalculating.value) return;

  isCalculating.value = true;
  try {
    const initialGameState = createInitialGameState();
    const results: MoveResult[] = await aiController.value.calculateMoves(
      initialGameState,
      3,
      1000,
    );
    console.log('[AIDemo] 3手先の計算結果:', results);
  } catch (error) {
    console.error('[AIDemo] 計算中にエラーが発生しました:', error);
  } finally {
    isCalculating.value = false;
  }
};
</script>

<style scoped>
.ai-demo {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.status {
  margin: 20px 0;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
