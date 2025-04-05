import { Store } from 'vuex';
import { TEST_TETRIS_BOARD } from '../utils/tetrisDef';
import type { RootState } from '../store';
import { generateQueue } from '../utils/queueGenerator';

// 問題生成サービス
const problemGenerator = {
  // 新しい問題を生成する
  generateNewProblem(store: Store<RootState>): void {
    // 空の盤面をセット
    store.commit('tetrisBoard/SET_TETRIS_BOARD', TEST_TETRIS_BOARD);
    // ホールドを空に
    store.commit('tetrisBoard/SET_HOLD_MINO', null);
    // 100個のランダムなミノを生成
    const { nextQueueMode } = store.getters['settings/settings'].gameSettings;
    const nextMinos = generateQueue(nextQueueMode, 100);
    store.commit('tetrisBoard/SET_NEXT_MINO', nextMinos);
  },
};

export default problemGenerator;
