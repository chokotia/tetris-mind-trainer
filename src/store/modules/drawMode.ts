import { DRAW_MODE } from '../../utils/tetrisDef';
import type { DrawModeType } from '../../types/tetris';

export interface DrawModeState {
  drawMode: DrawModeType;
}

export default {
  namespaced: true,
  state: {
    drawMode: DRAW_MODE.GRAY,
  },

  mutations: {
    SET_DRAW_MODE(state: DrawModeState, mode: DrawModeType): void {
      state.drawMode = mode;
    },
  },

  getters: {
    drawMode: (state: DrawModeState): DrawModeType => state.drawMode,
  },

  actions: {
  },
};
