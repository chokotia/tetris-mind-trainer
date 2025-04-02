import { ref } from 'vue';
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  EMPTY_TETRIS_BOARD,
  DRAW_MODE,
} from '../utils/tetrisDef';
import type { XYCoordinates, DrawModeType } from '../types/tetris';
import drawCell from '../services/tetrisBoardService';

export const useTetrisBoard = () => {
  // 状態管理
  const tetrisBoard = ref(EMPTY_TETRIS_BOARD.map((row) => [...row]));
  const isDragging = ref(false);
  const isStartedInsideBoard = ref(false);
  const currentDrawMode = ref<DrawModeType>(DRAW_MODE.GRAY);

  // ユーティリティ関数
  const getCellCoordinates = (event: MouseEvent): XYCoordinates => {
    const boardElement = event.currentTarget as HTMLElement;
    const rect = boardElement.getBoundingClientRect();
    const cellWidth = rect.width / BOARD_WIDTH;
    const cellHeight = rect.height / BOARD_HEIGHT;

    const x = Math.floor((event.clientX - rect.left) / cellWidth);
    const y = Math.floor((event.clientY - rect.top) / cellHeight);

    return { x, y };
  };

  const isValidCell = (x: number, y: number): boolean => (
    x >= 0 && x < BOARD_WIDTH && y >= 0 && y < BOARD_HEIGHT
  );

  // マウスイベントハンドラー
  const onMouseDown = (event: MouseEvent): void => {
    const { x, y } = getCellCoordinates(event);
    isStartedInsideBoard.value = isValidCell(x, y);
    isDragging.value = true;
    if (isStartedInsideBoard.value) {
      tetrisBoard.value = drawCell(tetrisBoard.value, x, y, currentDrawMode.value);
    }
  };

  const onMouseMove = (event: MouseEvent): void => {
    if (!isDragging.value || !isStartedInsideBoard.value) return;
    const { x, y } = getCellCoordinates(event);
    if (isValidCell(x, y)) {
      tetrisBoard.value = drawCell(tetrisBoard.value, x, y, currentDrawMode.value);
    }
  };

  const onMouseUp = (): void => {
    isDragging.value = false;
    isStartedInsideBoard.value = false;
  };

  return {
    tetrisBoard,
    isDragging,
    isStartedInsideBoard,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};

export default useTetrisBoard;
