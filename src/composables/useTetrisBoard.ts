import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import drawCell from '@/services/drawBoardCellService';
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  DRAW_MODE,
  TETRIS_BOARD_CELL,
} from '../utils/tetrisDef';
import type { XYCoordinates, TetrisBoardCellType } from '../types/tetris';

export const useTetrisBoard = () => {
  // 状態管理
  const isDragging = ref(false);
  const isStartedInsideBoard = ref(false);
  const dragStartCellState = ref<TetrisBoardCellType | null>(null);

  // Vuexから状態を取得
  const store = useStore();
  const drawMode = computed(() => store.getters['drawMode/drawMode']);
  const tetrisBoard = computed(() => store.getters['tetrisBoard/tetrisBoard']);

  // 現在のドローモードを計算するcomputedプロパティ
  const currentDrawMode = computed(() => {
    if (
      (drawMode.value === DRAW_MODE.GRAY)
      && (dragStartCellState.value === TETRIS_BOARD_CELL.GRAY)
    ) {
      // グレー かつ ドラッグ開始時のセルがすでにグレーだった場合はDelete処理を行う
      return DRAW_MODE.DELETE;
    }
    return drawMode.value;
  });

  // ユーティリティ関数
  const getCellCoordinatesFromMouse = (event: MouseEvent): XYCoordinates => {
    const boardElement = event.currentTarget as HTMLElement;
    const rect = boardElement.getBoundingClientRect();
    const cellWidth = rect.width / BOARD_WIDTH;
    const cellHeight = rect.height / BOARD_HEIGHT;

    const x = Math.floor((event.clientX - rect.left) / cellWidth);
    const y = Math.floor((event.clientY - rect.top) / cellHeight);

    return { x, y };
  };

  const getCellCoordinatesFromTouch = (touch: Touch, element: HTMLElement): XYCoordinates => {
    const rect = element.getBoundingClientRect();
    const cellWidth = rect.width / BOARD_WIDTH;
    const cellHeight = rect.height / BOARD_HEIGHT;

    const x = Math.floor((touch.clientX - rect.left) / cellWidth);
    const y = Math.floor((touch.clientY - rect.top) / cellHeight);

    return { x, y };
  };

  const isValidCell = (x: number, y: number): boolean => (
    x >= 0 && x < BOARD_WIDTH && y >= 0 && y < BOARD_HEIGHT
  );

  // マウスイベントハンドラー
  const onMouseDown = (event: MouseEvent): void => {
    const { x, y } = getCellCoordinatesFromMouse(event);
    isStartedInsideBoard.value = isValidCell(x, y);
    isDragging.value = true;
    if (isStartedInsideBoard.value) {
      dragStartCellState.value = tetrisBoard.value[y][x];
      drawCell({ x, y }, currentDrawMode.value, store);
    }
  };

  const onMouseMove = (event: MouseEvent): void => {
    if (!isDragging.value || !isStartedInsideBoard.value) return;
    const { x, y } = getCellCoordinatesFromMouse(event);

    if (isValidCell(x, y)) {
      drawCell({ x, y }, currentDrawMode.value, store);
    }
  };

  const onMouseUp = (): void => {
    isDragging.value = false;
    isStartedInsideBoard.value = false;
    dragStartCellState.value = null;
  };

  // タッチイベントハンドラー
  const onTouchStart = (event: TouchEvent): void => {
    event.preventDefault(); // デフォルトのスクロール動作を防止
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      const boardElement = event.currentTarget as HTMLElement;
      const { x, y } = getCellCoordinatesFromTouch(touch, boardElement);

      isStartedInsideBoard.value = isValidCell(x, y);
      isDragging.value = true;

      if (isStartedInsideBoard.value) {
        dragStartCellState.value = tetrisBoard.value[y][x];
        drawCell({ x, y }, currentDrawMode.value, store);
      }
    }
  };

  const onTouchMove = (event: TouchEvent): void => {
    event.preventDefault(); // デフォルトのスクロール動作を防止
    if (!isDragging.value || !isStartedInsideBoard.value) return;

    if (event.touches.length > 0) {
      const touch = event.touches[0];
      const boardElement = event.currentTarget as HTMLElement;
      const { x, y } = getCellCoordinatesFromTouch(touch, boardElement);

      if (isValidCell(x, y)) {
        drawCell({ x, y }, currentDrawMode.value, store);
      }
    }
  };

  const onTouchEnd = (): void => {
    isDragging.value = false;
    isStartedInsideBoard.value = false;
    dragStartCellState.value = null;
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};

export default useTetrisBoard;
