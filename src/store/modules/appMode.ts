import { ActionContext } from 'vuex';
import { APP_MODE } from '../../utils/app';
import type { AppModeType } from '../../types/app';

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
  },
};
