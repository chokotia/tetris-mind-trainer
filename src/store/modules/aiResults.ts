import { AIResultType } from '@/types/aiTypes';

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
  },
};
