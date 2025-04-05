import { AIResultType } from '@/types/aiTypes';
import storage from '../../utils/storage';

// 定数の分離
const STORAGE_KEY = 'tetrisAiResults';

export interface AIResultsState {
  moves: AIResultType[];
  moveIndex: number | null;
}

// Vuex用の型定義
type Context = {
  commit: (type: string, payload?: unknown) => void;
  state: AIResultsState;
  getters: {
    canMovePrevious: boolean;
    canMoveNext: boolean;
    getCurrentMove: AIResultType | null;
    [key: string]: unknown;
  };
};

export default {
  namespaced: true,

  state: (): AIResultsState => ({
    moves: [],
    moveIndex: null,
  }),

  getters: {
    getMoves: (state: AIResultsState) => state.moves,
    getMovesCount: (state: AIResultsState) => state.moves.length,
    getCurrentMove: (state: AIResultsState) => (
      (state.moveIndex !== null
        && state.moveIndex >= 0
        && state.moveIndex < state.moves.length)
        ? state.moves[state.moveIndex as number]
        : null
    ),
    getMoveIndex: (state: AIResultsState) => state.moveIndex,
    canMovePrevious: (state: AIResultsState) => state.moveIndex !== null && state.moveIndex > 0,
    canMoveNext: (state: AIResultsState) => state.moveIndex !== null
      && state.moves.length > 0
      && state.moveIndex < state.moves.length - 1,
  },

  mutations: {
    setMoves(state: AIResultsState, moves: AIResultType[]) {
      state.moves = moves;
      state.moveIndex = 0;
    },
    setMoveIndex(state: AIResultsState, index: number | null) {
      state.moveIndex = index;
    },
    clearResults(state: AIResultsState) {
      state.moves = [];
      state.moveIndex = null;
    },
    incrementIndex(state: AIResultsState) {
      if (state.moveIndex !== null
          && state.moveIndex < state.moves.length - 1) {
        state.moveIndex += 1;
      }
    },
    decrementIndex(state: AIResultsState) {
      if (state.moveIndex !== null && state.moveIndex > 0) {
        state.moveIndex -= 1;
      }
    },
  },

  actions: {
    // 前の手に移動するアクション
    moveToPrevious({ commit, getters }: Context): boolean {
      if (getters.canMovePrevious) {
        commit('decrementIndex');
        return true;
      }
      return false;
    },

    // 次の手に移動するアクション
    moveToNext({ commit, getters }: Context): boolean {
      if (getters.canMoveNext) {
        commit('incrementIndex');
        return true;
      }
      return false;
    },

    // 指定されたインデックスに移動するアクション
    moveToIndex({ commit }: Context, index: number): boolean {
      commit('setMoveIndex', index);
      return true;
    },

    // ローカルストレージに保存するアクション
    saveResults({ state }: Context): void {
      try {
        storage.save(STORAGE_KEY, state);
      } catch (error) {
        console.error('AI結果の保存に失敗しました', error);
        throw error;
      }
    },

    // ローカルストレージから読み込むアクション
    loadResults({ commit }: Context): AIResultsState | null {
      try {
        const results = storage.load<AIResultsState>(STORAGE_KEY);
        if (results) {
          if (results.moves) commit('setMoves', results.moves);
          if (results.moveIndex !== undefined) commit('setMoveIndex', results.moveIndex);
          return results;
        }
        return null;
      } catch (error) {
        console.error('AI結果の読み込みに失敗しました', error);
        throw error;
      }
    },
  },
};
