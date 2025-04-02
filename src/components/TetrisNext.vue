<template>
  <div class="tetris-next">
    <div class="next-pieces">
      <div v-for="(piece, index) in nextPieces" :key="index" class="next-piece">
        <div
          v-for="(row, rowIndex) in getPieceRows(piece)"
          :key="rowIndex"
          class="piece-row"
        >
          <div
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            class="piece-cell"
            :class="{ filled: cell }"
            :data-piece="cell ? piece : ''"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MINO, MINO_SHAPES } from '../utils/tetrisDef';
import type { MinoType } from '../types/tetris';

// テスト用に5つのミノを設定
const nextPieces = ref<MinoType[]>([
  MINO.I,
  MINO.O,
  MINO.T,
  MINO.L,
  MINO.J,
]);

// 4x4のグリッドに変換する関数
const getPieceRows = (piece: MinoType) => {
  const shape = MINO_SHAPES[piece];
  const rows = Array(4).fill(0).map(() => Array(4).fill(0));

  // 形状を中央に配置
  const offsetX = Math.floor((4 - shape[0].length) / 2);
  const offsetY = Math.floor((4 - shape.length) / 2);

  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        rows[y + offsetY][x + offsetX] = 1;
      }
    });
  });

  return rows;
};
</script>

<style scoped>
.tetris-next {
  background-color: #282828;
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
}

.next-pieces {
  display: flex;
  flex-direction: column;
  /* gap: 10px; */
}

.next-piece {
  width: calc(var(--size-next-hold-cell-vh) * 4);
  height: calc(var(--size-next-hold-cell-vh) * 4);
  /* background-color: rgba(0, 0, 0, 0.5); */
  /* border: 0px solid #444; */
  display: grid;
  grid-template-rows: repeat(4, 1fr);
}

.piece-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
