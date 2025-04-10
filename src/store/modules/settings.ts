import { ActionContext } from 'vuex';
import { QUEUE_GEN_MODE, AI_WEIGHT } from '../../utils/tetrisDef';
import { Settings } from '../../types/settings';
import storage from '../../utils/storage';

// 定数の分離
const STORAGE_KEY = 'tetrisSettings';

// デフォルト設定の分離
const DEFAULT_SETTINGS: Settings = {
  gameSettings: {
    nextQueueMode: QUEUE_GEN_MODE.SEVEN_BAG_PURE,
  },
  aiSettings: {
    searchTime: 0.5,
    movesCount: 20,
    weightsName: AI_WEIGHT.CC_STANDARD_LIKE,
    nextSize: 5,
  },
};

export interface State {
  settings: Settings;
}

type SettingsContext = ActionContext<State, unknown>;

export default {
  namespaced: true,
  state: {
    settings: DEFAULT_SETTINGS,
  },

  mutations: {
    SET_SETTINGS(state: State, newSettings: Settings): void {
      state.settings = newSettings;
    },
  },

  getters: {
    settings: (state: State): Settings => state.settings,
  },

  actions: {
    saveSettings({ commit }: SettingsContext, newSettings: Settings): void {
      try {
        storage.save(STORAGE_KEY, newSettings);
        commit('SET_SETTINGS', newSettings);
      } catch (error) {
        console.error('設定の保存に失敗しました', error);
        throw error;
      }
    },

    loadSettings({ commit }: SettingsContext): Settings | null {
      try {
        const settings = storage.load<Settings>(STORAGE_KEY);
        if (settings) {
          commit('SET_SETTINGS', settings);
          return settings;
        }
        return null;
      } catch (error) {
        console.error('設定の読み込みに失敗しました', error);
        throw error;
      }
    },
  },
};
