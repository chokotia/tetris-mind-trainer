import { createStore } from 'vuex';
import settings, { State as SettingsState } from './modules/settings';
// import board, { State as BoardState } from './modules/board';

// ルートストアの型定義
export interface RootState {
  settings: SettingsState;
  // board: BoardState;
}

export default createStore<RootState>({
  modules: {
    settings,
    // board,
  },
});
