import { computed } from 'vue';
import { Store } from 'vuex';
import type { TetrisBoardCellType, DrawModeType, XYCoordinates } from '../types/tetris';
import { DRAW_MODE, TetrisBoardCell, MINO } from '../utils/tetrisDef';
import type { RootState } from '../store';

type MinoShape = readonly [number, number][];

// ミノの形状定義
const MINO_SHAPES = {
  I: [
    [[0, 0], [1, 0], [2, 0], [3, 0]], // 横
    [[0, 0], [0, 1], [0, 2], [0, 3]], // 縦
  ] as MinoShape[],
  O: [
    [[0, 0], [1, 0], [0, 1], [1, 1]], // 回転なし
  ] as MinoShape[],
  T: [
    [[1, 0], [0, 1], [1, 1], [2, 1]], // 上
    [[0, 0], [1, 0], [2, 0], [1, 1]], // 下
    [[1, 0], [0, 1], [1, 1], [1, 2]], // 左
    [[0, 0], [0, 1], [0, 2], [1, 1]], // 右
  ] as MinoShape[],
  L: [
    [[0, 1], [1, 1], [2, 1], [2, 0]], // 上
    [[0, 0], [1, 0], [2, 0], [0, 1]], // 下
    [[1, 0], [1, 1], [1, 2], [0, 0]], // 左
    [[0, 0], [0, 1], [0, 2], [1, 2]], // 右
  ] as MinoShape[],
  J: [
    [[0, 0], [0, 1], [1, 1], [2, 1]], // 上
    [[0, 0], [1, 0], [2, 0], [2, 1]], // 下
    [[1, 0], [1, 1], [1, 2], [0, 2]], // 左
    [[0, 0], [0, 1], [0, 2], [1, 0]], // 右
  ] as MinoShape[],
  S: [
    [[1, 0], [2, 0], [0, 1], [1, 1]], // 横
    [[0, 0], [0, 1], [1, 1], [1, 2]], // 縦
  ] as MinoShape[],
  Z: [
    [[0, 0], [1, 0], [1, 1], [2, 1]], // 横
    [[1, 0], [1, 1], [0, 1], [0, 2]], // 縦
  ] as MinoShape[],
} as const;

// 白いセルの座標を取得する関数
const getWhiteCells = (board: TetrisBoardCellType[][]): XYCoordinates[] => {
  const whiteCells: XYCoordinates[] = [];
  for (let y = 0; y < board.length; y += 1) {
    for (let x = 0; x < board[y].length; x += 1) {
      if (board[y][x] === TetrisBoardCell.WHITE) {
        whiteCells.push({ x, y });
      }
    }
  }
  return whiteCells;
};

// ミノの形状にマッチするかチェックする関数
const checkMinoShape = (
  whiteCells: XYCoordinates[],
  minoType: keyof typeof MINO,
): boolean => {
  if (whiteCells.length !== 4) return false;

  const shapes = MINO_SHAPES[minoType];

  return shapes.some((shape) => {
    // 形状の最小x, y座標を計算
    const shapeMinX = Math.min(...shape.map((coord) => coord[0]));
    const shapeMinY = Math.min(...shape.map((coord) => coord[1]));

    // 白いセルの最小x, y座標を計算
    const whiteCellsMinX = Math.min(...whiteCells.map((cell) => cell.x));
    const whiteCellsMinY = Math.min(...whiteCells.map((cell) => cell.y));

    // 基準点を計算
    const baseX = whiteCellsMinX - shapeMinX;
    const baseY = whiteCellsMinY - shapeMinY;

    // 基準点を考慮して正規化したセルを計算
    const normalizedCells = whiteCells.map((cell) => ({
      x: cell.x - baseX,
      y: cell.y - baseY,
    }));

    return shape.every((coord: [number, number]) => {
      const [x, y] = coord;
      return normalizedCells.some((cell) => cell.x === x && cell.y === y);
    });
  });
};

// マッチするミノの種類を取得する関数
const getMatchingMino = (whiteCells: XYCoordinates[]): keyof typeof MINO | null => {
  const minoTypes = Object.keys(MINO);
  for (let i = 0; i < minoTypes.length; i += 1) {
    const minoType = minoTypes[i] as keyof typeof MINO;
    if (checkMinoShape(whiteCells, minoType)) {
      return minoType;
    }
  }
  return null;
};

const drawCell = (
  coordinates: XYCoordinates,
  mode: DrawModeType,
  store: Store<RootState>,
): void => {
  const { x, y } = coordinates;
  const tetrisBoard = computed(() => store.getters['tetrisBoard/tetrisBoard']);
  const newBoard = tetrisBoard.value.map((row: TetrisBoardCellType[]) => [...row]);

  switch (mode) {
    case DRAW_MODE.GRAY: {
      newBoard[y][x] = TetrisBoardCell.GRAY;
      break;
    }
    case DRAW_MODE.DELETE: {
      newBoard[y][x] = TetrisBoardCell.NULL;
      break;
    }
    case DRAW_MODE.AUTO: {
      // すでに色がついているセル（null以外のセル）には塗れない
      if (newBoard[y][x] !== TetrisBoardCell.NULL) {
        return;
      }

      // 白いセルを追加
      newBoard[y][x] = TetrisBoardCell.WHITE;

      // 白いセルを取得
      const whiteCells = getWhiteCells(newBoard);

      // 白いセルが4つ以上ある場合はすべて消去
      if (whiteCells.length > 4) {
        // ※ ここには来ないはずだが念のため
        whiteCells.forEach((cell) => {
          newBoard[cell.y][cell.x] = TetrisBoardCell.NULL;
        });
      } else if (whiteCells.length === 4) { // 白いセルが4つになった場合、ミノの形状をチェック
        const matchingMino = getMatchingMino(whiteCells);
        if (matchingMino) {
          // マッチするミノが見つかった場合、その色に変更
          whiteCells.forEach((cell) => {
            newBoard[cell.y][cell.x] = TetrisBoardCell[matchingMino];
          });
        }
      }
      break;
    }
    default: {
      throw new Error(`Invalid draw mode: ${mode}`);
    }
  }

  store.commit('tetrisBoard/SET_TETRIS_BOARD', newBoard);
};

export default drawCell;
