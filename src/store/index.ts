import { createStore } from 'vuex';
import settings, { State as SettingsState } from './modules/settings';
import tetrisBoard, { TetrisBoardState } from './modules/tetrisBoard';
import drawMode, { DrawModeState } from './modules/drawMode';
import aiResults, { AIResultsState } from './modules/aiResults';
import appMode, { AppModeState } from './modules/appMode';

// ルートストアの型定義
export interface RootState {
  settings: SettingsState;
  tetrisBoard: TetrisBoardState;
  drawMode: DrawModeState;
  aiResults: AIResultsState;
  appMode: AppModeState;
}

export default createStore<RootState>({
  modules: {
    settings,
    tetrisBoard,
    drawMode,
    aiResults,
    appMode,
  },
});
