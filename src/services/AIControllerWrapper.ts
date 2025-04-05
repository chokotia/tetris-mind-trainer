import type { AIStatusType, AIResultType, GameStateType } from '@/types/aiTypes';
import store from '@/store';
import AIController from './core/ai/AIController';

/**
 * AIエンジン本体のラッパークラス
 */
export default class AIControllerWrapper {
  private aiController: AIController;

  constructor() {
    this.aiController = new AIController();
  }

  getStatus(): AIStatusType {
    return this.aiController.getStatus();
  }

  getStatusMessage(): string {
    return this.aiController.getStatusMessage();
  }

  async calculateMoves(): Promise<void> {
    // Vuexから各種値を取得
    const tetrisBoard = store.getters['tetrisBoard/tetrisBoard'];
    const nextMino = store.getters['tetrisBoard/nextMino'];
    const holdMino = store.getters['tetrisBoard/holdMino'];
    const { movesCount, searchTime, weightsName } = store.getters['settings/settings'].aiSettings;

    const initialGameState: GameStateType = JSON.parse(JSON.stringify({
      weightsName,
      board: tetrisBoard,
      queue: nextMino,
      hold: holdMino,
      combo: 0,
      backToBack: false,
    }));

    console.log('[AIControllerWrapper] initialGameState', initialGameState);

    // AIでの計算を実行
    const result: AIResultType[] = await this.aiController.calculateMoves(
      initialGameState,
      movesCount,
      searchTime * 1000, // 秒をミリ秒に変換
    );

    // 計算結果をvuexに保存
    store.commit('aiResults/setMoves', result);
  }
}
