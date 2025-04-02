<template>
  <div class="tetris-hold">
    <div class="hold-piece" v-if="holdPiece">
      <div class="piece-grid">
        <div
          v-for="(cell, index) in pieceCells"
          :key="index"
          class="piece-cell"
          :class="{ filled: cell }"
        />
      </div>
    </div>
    <div class="hold-piece empty" v-else>
      <!-- ホールドされていない場合の表示 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { MINO } from '../utils/tetrisDef';
import type { MinoType } from '../types/tetris';

// テスト用にIミノを設定
const holdPiece = ref<MinoType>(MINO.I);

// ミノの形状定義（簡略化版）
const MINO_SHAPES = {
  I: [
    [1, 1, 1, 1],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  L: [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  J: [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
};

// 4x4のグリッドに変換
const pieceCells = computed(() => {
  const shape = MINO_SHAPES[holdPiece.value];
  const cells = Array(16).fill(0);

  // 形状を中央に配置
  const offsetX = Math.floor((4 - shape[0].length) / 2);
  const offsetY = Math.floor((4 - shape.length) / 2);

  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const index = (y + offsetY) * 4 + (x + offsetX);
        cells[index] = 1;
      }
    });
  });

  return cells;
});
</script>

<style scoped>
.tetris-hold {
  background-color: rgba(0, 0, 0, 0.8);
  border: 2px solid #666;
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
}

.hold-piece {
  width: calc(var(--size-next-hold-cell-vh) * 4);
  height: calc(var(--size-next-hold-cell-vh) * 4);
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #444;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  gap: 0px;
  padding: 1px;
}

.hold-piece.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

.piece-grid {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 0px;
}

.piece-cell {
  width: var(--size-next-hold-cell-vh);
  height: var(--size-next-hold-cell-vh);
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid #444;
  user-select: none;
}

.piece-cell.filled {
  background-color: var(--color-piece-i);
  border: 1px solid var(--color-piece-i);
}
</style>
