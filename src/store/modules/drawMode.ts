import { DRAW_MODE } from '../../utils/tetrisDef';
import type { DrawModeType } from '../../types/tetris';
import storage from '../../utils/storage';

// 定数の分離
const STORAGE_KEY = 'tetrisDrawMode';

export interface DrawModeState {
  drawMode: DrawModeType;
}

export default {
  namespaced: true,
  state: {
    drawMode: DRAW_MODE.AUTO,
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
    // ローカルストレージに保存するアクション
    saveDrawMode({ state }: { state: DrawModeState }): void {
      try {
        storage.save(STORAGE_KEY, state);
      } catch (error) {
        console.error('描画モードの保存に失敗しました', error);
        throw error;
      }
    },

    // ローカルストレージから読み込むアクション
    loadDrawMode({ commit }: {
      commit: (type: string, payload: unknown) => void
    }): DrawModeState | null {
      try {
        const mode = storage.load<DrawModeState>(STORAGE_KEY);
        if (mode && mode.drawMode) {
          commit('SET_DRAW_MODE', mode.drawMode);
          return mode;
        }
        return null;
      } catch (error) {
        console.error('描画モードの読み込みに失敗しました', error);
        throw error;
      }
    },
  },
};
