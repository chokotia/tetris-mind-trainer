<template>
  <div class="tetris-hold">
    <div class="hold-piece" v-if="holdPiece">
      <div class="piece-grid">
        <div
          v-for="(cell, index) in pieceCells"
          :key="index"
          class="piece-cell"
          :class="{ filled: cell }"
          :data-piece="cell ? holdPiece : ''"
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
import { MINO, MINO_SHAPES } from '../utils/tetrisDef';
import type { MinoType } from '../types/tetris';

// テスト用にIミノを設定
const holdPiece = ref<MinoType>(MINO.O);

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
  background-color: #282828;
  /* border: 2px solid #666; */
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
}

.hold-piece {
  width: calc(var(--size-next-hold-cell-vh) * 4);
  height: calc(var(--size-next-hold-cell-vh) * 4);
  /* background-color: #333; */
  /* border: 0px solid #444; */
  display: grid;
  grid-template-rows: repeat(4, 1fr);
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
}

.piece-cell {
  width: var(--size-next-hold-cell-vh);
  height: var(--size-next-hold-cell-vh);
  /* background-color: rgba(0, 0, 0, 0.3); */
  /* border: 1px solid #444; */
  user-select: none;
}

/* ミノタイプに応じた色を設定 */
.piece-cell.filled[data-piece="I"] {
  background-color: var(--color-piece-i);
  border: 1px solid var(--color-piece-i);
}

.piece-cell.filled[data-piece="O"] {
  background-color: var(--color-piece-o);
  border: 1px solid var(--color-piece-o);
}

.piece-cell.filled[data-piece="T"] {
  background-color: var(--color-piece-t);
  border: 1px solid var(--color-piece-t);
}

.piece-cell.filled[data-piece="L"] {
  background-color: var(--color-piece-l);
  border: 1px solid var(--color-piece-l);
}

.piece-cell.filled[data-piece="J"] {
  background-color: var(--color-piece-j);
  border: 1px solid var(--color-piece-j);
}

.piece-cell.filled[data-piece="S"] {
  background-color: var(--color-piece-s);
  border: 1px solid var(--color-piece-s);
}

.piece-cell.filled[data-piece="Z"] {
  background-color: var(--color-piece-z);
  border: 1px solid var(--color-piece-z);
}
</style>
