import { AIResultType } from '@/types/aiTypes';

export interface AIResultsState {
  moves: AIResultType[];
  moveIndex: number | null;
}

export default {
  namespaced: true,

  state: (): AIResultsState => ({
    moves: [],
    moveIndex: null,
  }),

  getters: {
    getMoves: (state: AIResultsState) => state.moves,
    getCurrentMove: (state: AIResultsState) => (
      (state.moveIndex !== null
        && state.moveIndex >= 0
        && state.moveIndex < state.moves.length)
        ? state.moves[state.moveIndex as number]
        : null
    ),
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
          && state.moveIndex < state.moves.length - 2) {
        state.moveIndex += 1;
      }
    },
    decrementIndex(state: AIResultsState) {
      if (state.moveIndex !== null && state.moveIndex > 1) {
        state.moveIndex -= 1;
      }
    },
  },

  actions: {
  },
};
