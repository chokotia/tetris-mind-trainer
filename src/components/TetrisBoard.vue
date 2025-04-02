<template>
    <div class="version">4</div>
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
import { computed } from 'vue';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../utils/tetrisDef';
import type { TetrisBoardCellType } from '../types/tetris';
import { useTetrisBoard } from '../composables/useTetrisBoard';

const {
  tetrisBoard,
  onMouseDown,
  onMouseMove,
  onMouseUp,
} = useTetrisBoard();

// スタイル関連の定義
const boardStyle = computed(() => ({
  '--board-width': BOARD_WIDTH,
  '--board-height': BOARD_HEIGHT,
}));

const getCellStyle = (cellValue: TetrisBoardCellType) => {
  if (!cellValue) return {};
  return {
    backgroundColor: `var(--color-piece-${cellValue.toLowerCase()})`,
  };
};

// 開発環境でのテストデータ設定
if (process.env.NODE_ENV === 'development') {
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
}
</script>

<style scoped>
.tetris-board {
  display: grid;
  grid-template-rows: repeat(var(--board-height), 1fr);
  gap: 1px;
  background-color: #333;
  padding: 1px;
  border: 1px solid #666;
}

.tetris-board-row {
  display: grid;
  grid-template-columns: repeat(var(--board-width), 1fr);
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
