import { TEST_TETRIS_BOARD, MINO } from '../../utils/tetrisDef';
import type { TetrisBoardCellType, MinoType } from '../../types/tetris';

export interface TetrisBoardState {
  tetrisBoard: TetrisBoardCellType[][];
  holdMino: MinoType | null;
  nextMino: MinoType[];
}

export default {
  namespaced: true,
  state: {
    tetrisBoard: TEST_TETRIS_BOARD.map((row) => [...row]),
    holdMino: MINO.I,
    nextMino: Array(100).fill(MINO.I),
  },

  mutations: {
    SET_TETRIS_BOARD(state: TetrisBoardState, newBoard: TetrisBoardCellType[][]): void {
      state.tetrisBoard = newBoard.map((row) => [...row]);
    },
    SET_HOLD_MINO(state: TetrisBoardState, newHoldMino: MinoType): void {
      state.holdMino = newHoldMino;
    },
    SET_NEXT_MINO(state: TetrisBoardState, newNextMino: MinoType[]): void {
      state.nextMino = newNextMino;
    },
  },

  getters: {
    tetrisBoard: (state: TetrisBoardState): TetrisBoardCellType[][] => state.tetrisBoard,
    holdMino: (state: TetrisBoardState): MinoType | null => state.holdMino,
    nextMino: (state: TetrisBoardState): MinoType[] => state.nextMino,
  },

  actions: {
  },
};
