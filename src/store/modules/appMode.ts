import { ActionContext } from 'vuex';
import { APP_MODE } from '../../utils/app';
import type { AppModeType } from '../../types/app';
import storage from '../../utils/storage';

// 定数の分離
const STORAGE_KEY = 'tetrisAppMode';

export interface AppModeState {
  mode: AppModeType;
}

type AppModeContext = ActionContext<AppModeState, unknown>;

export default {
  namespaced: true,

  state: {
    mode: APP_MODE.EDIT,
  },

  mutations: {
    SET_MODE(state: AppModeState, mode: AppModeType): void {
      state.mode = mode;
    },
  },

  getters: {
    mode: (state: AppModeState): AppModeType => state.mode,
    isEditMode: (state: AppModeState): boolean => state.mode === APP_MODE.EDIT,
    isAiMode: (state: AppModeState): boolean => state.mode === APP_MODE.AI,
  },

  actions: {
    toggleMode({ commit, state }: AppModeContext): void {
      const newMode = state.mode === APP_MODE.EDIT ? APP_MODE.AI : APP_MODE.EDIT;
      commit('SET_MODE', newMode);
    },
    setMode({ commit }: AppModeContext, mode: AppModeType): void {
      commit('SET_MODE', mode);
    },

    // ローカルストレージに保存するアクション
    saveMode({ state }: AppModeContext): void {
      try {
        storage.save(STORAGE_KEY, state);
      } catch (error) {
        console.error('アプリモードの保存に失敗しました', error);
        throw error;
      }
    },

    // ローカルストレージから読み込むアクション
    loadMode({ commit }: AppModeContext): AppModeState | null {
      try {
        const appMode = storage.load<AppModeState>(STORAGE_KEY);
        if (appMode && appMode.mode) {
          commit('SET_MODE', appMode.mode);
          return appMode;
        }
        return null;
      } catch (error) {
        console.error('アプリモードの読み込みに失敗しました', error);
        throw error;
      }
    },
  },
};
