import { createStore } from 'vuex';
import settings, { State } from './modules/settings';

// ルートストアの型定義
export interface RootState {
  settings: State;
}

export default createStore<RootState>({
  modules: {
    settings,
  },
});
