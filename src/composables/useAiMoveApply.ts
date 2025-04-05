import { useStore } from 'vuex';
import type { AIResultType } from '@/types/aiTypes';

/**
 * AI解析結果を盤面に適用するためのComposable
 *
 * @returns AI解析結果適用に関連する関数
 */
export default function useAiMoveApply() {
  const store = useStore();

  /**
   * 指定されたインデックスの手を盤面に適用する
   *
   * @param moveIndex 適用する手のインデックス
   * @returns 適用に成功したかどうか
   */
  const applyMoveByIndex = (moveIndex: number): boolean => {
    if (moveIndex === undefined) return false;

    store.commit('aiResults/setMoveIndex', moveIndex);

    // 盤面状態を更新
    const move: AIResultType | undefined = JSON.parse(
      JSON.stringify(store.getters['aiResults/getCurrentMove']),
    );

    if (!move) return false;

    store.commit('tetrisBoard/SET_TETRIS_BOARD', move.board);
    store.commit('tetrisBoard/SET_NEXT_MINO', move.next);
    store.commit('tetrisBoard/SET_HOLD_MINO', move.hold);

    return true;
  };

  /**
   * 特定のAI解析結果を直接盤面に適用する
   *
   * @param move 適用する手の情報
   * @returns 適用に成功したかどうか
   */
  const applyMove = (move: AIResultType): boolean => {
    if (!move) return false;

    store.commit('tetrisBoard/SET_TETRIS_BOARD', move.board);
    store.commit('tetrisBoard/SET_NEXT_MINO', move.next);
    store.commit('tetrisBoard/SET_HOLD_MINO', move.hold);

    return true;
  };

  return {
    applyMoveByIndex,
    applyMove,
  };
}
