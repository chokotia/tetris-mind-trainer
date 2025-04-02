import { Store } from 'vuex';
import type { TetrisBoardCellType, MinoType } from '../types/tetris';
import { MINO, TEST_TETRIS_BOARD } from '../utils/tetrisDef';
import type { RootState } from '../store';

// ランダムなミノを生成する関数
const generateRandomMino = (): MinoType => {
  const minos = Object.values(MINO);
  return minos[Math.floor(Math.random() * minos.length)];
};

// 問題生成サービス
const problemGenerator = {
  // 新しい問題を生成する
  generateNewProblem(store: Store<RootState>): void {
    // 空の盤面をセット
    store.commit('tetrisBoard/SET_TETRIS_BOARD', TEST_TETRIS_BOARD);
    // ホールドを空に
    store.commit('tetrisBoard/SET_HOLD_MINO', null);
    // 100個のランダムなミノを生成
    const nextMinos = Array(100).fill(null).map(() => generateRandomMino());
    store.commit('tetrisBoard/SET_NEXT_MINO', nextMinos);
  },
};

export default problemGenerator;
