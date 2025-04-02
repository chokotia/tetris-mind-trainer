<template>
  <div
    class="tetris-board"
    :style="boardStyle"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
  >
    <div
      v-for="(rowData, rowIndex) in tetrisBoard"
      :key="rowIndex"
      class="tetris-board-row"
    >
      <div
        v-for="(cellValue, colIndex) in rowData"
        :key="colIndex"
        class="tetris-board-cell"
        :style="getCellStyle(cellValue)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineExpose, ref } from 'vue';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../utils/tetrisDef';
import type { BLOCK_TYPE } from '../utils/tetrisDef';

let isBoardHidden = false;
const emptyTetrisBoard = Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null));
const tetrisBoard = ref(emptyTetrisBoard.map((row) => [...row]));

// ドラッグ状態の管理
const isDragging = ref(false);

// テスト用のミノを配置
const setDummyData = () => {
  const board = tetrisBoard.value;
  board[19][5] = 'I';
  board[19][6] = 'I';
  board[19][7] = 'I';
  board[19][8] = 'I';

  board[18][2] = 'S';
  board[18][3] = 'S';
  board[19][3] = 'S';
  board[19][4] = 'S';

  board[18][1] = 'T';
  board[19][0] = 'T';
  board[19][1] = 'T';
  board[19][2] = 'T';
};
setDummyData();

// グリッドの表示/非表示を切り替え
const toggleGridVisibility = () => {
  isBoardHidden = !isBoardHidden;
};

const boardStyle = computed(() => ({
  '--width': BOARD_WIDTH,
  '--height': BOARD_HEIGHT,
}));

const getCellStyle = (cellValue: BLOCK_TYPE) => {
  if (!cellValue) return {};
  const style = {
    backgroundColor: `var(--color-piece-${cellValue.toLowerCase()})`,
  };
  return style;
};

// ユーティリティ関数
const getCellCoordinates = (event: MouseEvent) => {
  const boardElement = event.currentTarget as HTMLElement;
  const rect = boardElement.getBoundingClientRect();
  const cellWidth = rect.width / BOARD_WIDTH;
  const cellHeight = rect.height / BOARD_HEIGHT;

  const x = Math.floor((event.clientX - rect.left) / cellWidth);
  const y = Math.floor((event.clientY - rect.top) / cellHeight);

  return { x, y };
};

const isValidCell = (x: number, y: number) => (
  x >= 0 && x < BOARD_WIDTH && y >= 0 && y < BOARD_HEIGHT
);

// マウスイベントハンドラー
const onMouseDown = (event: MouseEvent) => {
  if (isBoardHidden) return;
  isDragging.value = true;
  const { x, y } = getCellCoordinates(event);
  if (isValidCell(x, y)) {
    tetrisBoard.value[y][x] = 'WHITE';
  }
};

const onMouseMove = (event: MouseEvent) => {
  if (!isDragging.value || isBoardHidden) return;
  const { x, y } = getCellCoordinates(event);
  if (isValidCell(x, y)) {
    tetrisBoard.value[y][x] = 'WHITE';
  }
};

const onMouseUp = (event: MouseEvent) => {
  isDragging.value = false;
};

defineExpose({
  toggleGridVisibility,
});
</script>

<style scoped>
.tetris-board {
  display: grid;
  grid-template-rows: repeat(var(--height), 1fr);
  gap: 1px;
  background-color: #333;
  padding: 1px;
  border: 1px solid #666;
}

:root {
  --color-piece-i: #00f0f0;
  --color-piece-s: #00f000;
  --color-piece-t: #a000f0;
  --color-piece-gray: #808080;
  --color-piece-white: #ffffff;
}

.tetris-board-row {
  display: grid;
  grid-template-columns: repeat(var(--width), 1fr);
  gap: 1px;
}

.tetris-board-cell {
  width: var(--size-cell-vh);
  height: var(--size-cell-vh);
  background-color: #222;
  border: 1px solid rgba(255, 255, 255, 0.1);
  user-select: none;
}

</style>
