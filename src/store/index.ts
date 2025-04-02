import { createStore } from 'vuex';
import settings, { State as SettingsState } from './modules/settings';
import tetrisBoard, { TetrisBoardState } from './modules/tetrisBoard';
import drawMode, { DrawModeState } from './modules/drawMode';

// ルートストアの型定義
export interface RootState {
  settings: SettingsState;
  tetrisBoard: TetrisBoardState;
  drawMode: DrawModeState;
}

export default createStore<RootState>({
  modules: {
    settings,
    tetrisBoard,
    drawMode,
  },
});
