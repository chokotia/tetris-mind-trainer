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
   * @returns 適用に成功したかどうかを解決するPromise
   */
  const applyMoveByIndex = async (moveIndex: number): Promise<boolean> => {
    if (moveIndex === undefined) return false;

    // インデックスを設定し、手を適用する
    await store.dispatch('aiResults/moveToIndex', moveIndex);

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

  /**
   * 前の手に移動して適用する
   *
   * @returns 適用に成功したかを解決するPromise
   */
  const moveToPrevious = async (): Promise<boolean> => {
    const success = await store.dispatch('aiResults/moveToPrevious');
    if (success) {
      // 盤面状態を更新
      const move = store.getters['aiResults/getCurrentMove'];
      if (move) {
        applyMove(move);
        return true;
      }
    }
    return false;
  };

  /**
   * 次の手に移動して適用する
   *
   * @returns 適用に成功したかを解決するPromise
   */
  const moveToNext = async (): Promise<boolean> => {
    const success = await store.dispatch('aiResults/moveToNext');
    if (success) {
      // 盤面状態を更新
      const move = store.getters['aiResults/getCurrentMove'];
      if (move) {
        applyMove(move);
        return true;
      }
    }
    return false;
  };

  /**
   * 最初の手（0手目）に移動して適用する
   *
   * @returns 適用に成功したかを解決するPromise
   */
  const moveToFirst = async (): Promise<boolean> => {
    // 最初の手のインデックスは0
    const success = await store.dispatch('aiResults/moveToIndex', 0);
    if (success) {
      // 盤面状態を更新
      const move = store.getters['aiResults/getCurrentMove'];
      if (move) {
        applyMove(move);
        return true;
      }
    }
    return false;
  };

  /**
   * 最後の手に移動して適用する
   *
   * @returns 適用に成功したかを解決するPromise
   */
  const moveToLast = async (): Promise<boolean> => {
    // 最後の手のインデックスを取得
    const movesCount = store.getters['aiResults/getMovesCount'];
    if (movesCount <= 0) return false;

    const lastIndex = movesCount - 1;
    const success = await store.dispatch('aiResults/moveToIndex', lastIndex);
    if (success) {
      // 盤面状態を更新
      const move = store.getters['aiResults/getCurrentMove'];
      if (move) {
        applyMove(move);
        return true;
      }
    }
    return false;
  };

  return {
    applyMoveByIndex,
    applyMove,
    moveToPrevious,
    moveToNext,
    moveToFirst,
    moveToLast,
  };
}
