import { TEST_TETRIS_BOARD, MINO } from '../../utils/tetrisDef';
import type { TetrisBoardCellType, MinoType } from '../../types/tetris';
import storage from '../../utils/storage';

// 定数の分離
const STORAGE_KEY = 'tetrisBoardState';

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
    // ローカルストレージに保存するアクション
    saveState({ state }: { state: TetrisBoardState }): void {
      try {
        storage.save(STORAGE_KEY, state);
      } catch (error) {
        console.error('テトリスボードの状態保存に失敗しました', error);
        throw error;
      }
    },

    // ローカルストレージから読み込むアクション
    loadState({ commit }: {
      commit: (type: string, payload: unknown) => void
    }): TetrisBoardState | null {
      try {
        const boardState = storage.load<TetrisBoardState>(STORAGE_KEY);
        if (boardState) {
          if (boardState.tetrisBoard) commit('SET_TETRIS_BOARD', boardState.tetrisBoard);
          if (boardState.holdMino) commit('SET_HOLD_MINO', boardState.holdMino);
          if (boardState.nextMino) commit('SET_NEXT_MINO', boardState.nextMino);
          return boardState;
        }
        return null;
      } catch (error) {
        console.error('テトリスボードの状態読み込みに失敗しました', error);
        throw error;
      }
    },
  },
};
