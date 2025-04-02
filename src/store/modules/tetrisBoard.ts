import { TEST_TETRIS_BOARD } from '../../utils/tetrisDef';
import type { TetrisBoardCellType } from '../../types/tetris';

export interface TetrisBoardState {
  tetrisBoard: TetrisBoardCellType[][];
}

export default {
  namespaced: true,
  state: {
    tetrisBoard: TEST_TETRIS_BOARD.map((row) => [...row]),
  },

  mutations: {
    SET_TETRIS_BOARD(state: TetrisBoardState, newBoard: TetrisBoardCellType[][]): void {
      state.tetrisBoard = newBoard.map((row) => [...row]);
    },
  },

  getters: {
    tetrisBoard: (state: TetrisBoardState): TetrisBoardCellType[][] => state.tetrisBoard,
  },

  actions: {
  },
};
