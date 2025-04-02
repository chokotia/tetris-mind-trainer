import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import drawCell from '@/services/tetrisBoardService';
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  DRAW_MODE,
  TetrisBoardCell,
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
      && (dragStartCellState.value === TetrisBoardCell.GRAY)
    ) {
      // グレー かつ ドラッグ開始時のセルがすでにグレーだった場合はDelete処理を行う
      return DRAW_MODE.DELETE;
    }
    return drawMode.value;
  });

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
    dragStartCellState.value = tetrisBoard.value[y][x];

    // ドラッグ開始時のセルが盤面外の場合は何もしない
    if (!isStartedInsideBoard.value) {
      return;
    }

    drawCell({ x, y }, currentDrawMode.value, store);
  };

  const onMouseMove = (event: MouseEvent): void => {
    if (!isDragging.value || !isStartedInsideBoard.value) return;
    const { x, y } = getCellCoordinates(event);

    // ドラッグ開始時のセルが盤面外 or 現在の座標がセル外の場合は何もしない
    if (!isValidCell(x, y) || !isStartedInsideBoard.value) {
      return;
    }

    drawCell({ x, y }, currentDrawMode.value, store);
  };

  const onMouseUp = (): void => {
    isDragging.value = false;
    isStartedInsideBoard.value = false;
    dragStartCellState.value = null;
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};

export default useTetrisBoard;
