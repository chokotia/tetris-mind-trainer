import { ActionContext } from 'vuex';
import { QUEUE_GEN_MODE, AI_WEIGHT } from '../../utils/tetrisDef';
import { Settings } from '../../types/settings';
import { validateSettings } from '../../utils/validators/settings';
import storage from '../../utils/storage';

// 定数の分離
const STORAGE_KEY = 'tetrisSettings';
const ERROR_MESSAGES = {
  INVALID_SETTINGS: 'settings.error.invalid',
  SAVE_FAILED: 'settings.error.saveFailed',
  LOAD_FAILED: 'settings.error.loadFailed',
} as const;

type ErrorMessageKey = keyof typeof ERROR_MESSAGES;

// デフォルト設定の分離
const DEFAULT_SETTINGS: Settings = {
  boardSettings: {
    width: 5,
    height: 10,
    nextCount: 5,
    blockRange: {
      min: 0,
      max: 3,
    },
    minoMode: QUEUE_GEN_MODE.SEVEN_BAG_PURE,
  },
  aiSettings: {
    searchTime: 1,
    movesCount: 5,
    weightsName: AI_WEIGHT.CC_STANDARD_LIKE,
  },
  gameSettings: {
    nextQueueMode: QUEUE_GEN_MODE.SEVEN_BAG_PURE,
  },
};

// カスタムエラークラス
class SettingsError extends Error {
  cause?: unknown;

  constructor(message: ErrorMessageKey, cause?: unknown) {
    super(ERROR_MESSAGES[message]);
    this.name = 'SettingsError';
    if (cause) {
      this.cause = cause;
    }
    console.error(ERROR_MESSAGES[message]);
  }
}

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
        if (!validateSettings(newSettings)) {
          throw new SettingsError('INVALID_SETTINGS');
        }
        storage.save(STORAGE_KEY, newSettings);
        commit('SET_SETTINGS', newSettings);
      } catch (error) {
        if (error instanceof SettingsError) {
          throw error;
        }
        throw new SettingsError('SAVE_FAILED', error);
      }
    },

    loadSettings({ commit }: SettingsContext): Settings | null {
      try {
        const settings = storage.load<Settings>(STORAGE_KEY);
        if (settings && validateSettings(settings)) {
          commit('SET_SETTINGS', settings);
          return settings;
        }
        return null;
      } catch (error) {
        if (error instanceof SettingsError) {
          throw error;
        }
        throw new SettingsError('LOAD_FAILED', error);
      }
    },
  },
};
