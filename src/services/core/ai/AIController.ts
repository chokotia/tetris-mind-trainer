import {
  AIStatusType,
  GameStateType,
  MoveType,
  AIResultType,
  SuggestionMessageType,
  WorkerMessageType,
} from '@/types/aiTypes';

import { AI_STATUS } from '@/utils/aiDef';

import EventEmitter from './EventEmitter';

/**
 * AIエンジン本体
 * テトリスの探索と評価を行う核となるロジック
 */
export default class AIController extends EventEmitter {
  private worker: Worker | null;

  private status: AIStatusType;

  private message: string;

  constructor() {
    super();
    this.worker = null;
    this.status = AI_STATUS.UNINITIALIZED;
    this.message = '';
  }

  /**
   * ステータスを設定
   */
  private setStatus(status: AIStatusType, message = ''): void {
    this.status = status;
    this.message = message;
  }

  /**
   * ステータスを取得
   */
  getStatus(): AIStatusType {
    return this.status;
  }

  /**
   * メッセージを取得
   */
  getStatusMessage(): string {
    return this.message;
  }

  /**
   * ボットワーカーを初期化
   */
  private async initialize(): Promise<void> {
    try {
      this.setStatus(AI_STATUS.INITIALIZING);
      this.stopWorker();

      this.worker = new Worker(new URL('./bot/freybot.js', import.meta.url), { type: 'module' });
      this.worker.onerror = (e: ErrorEvent) => {
        this.setStatus(AI_STATUS.ERROR, e.message);
        if (this.worker) {
          this.worker.terminate();
          this.worker = null;
        }
      };

      // workerからのメッセージをイベントとして再発行するハンドラ
      // ※ 補足
      //   土管のようになっており、一見意味のない設計になっているが、
      //   非同期処理を同期的に見せる（await）ことができ、
      //   requestSuggestion()などのメソッドで戻り値として結果を受け取れるようになるメリットがあるため採用している。
      this.worker.onmessage = (e: MessageEvent) => {
        const message = e.data as WorkerMessageType;
        switch (message.type) {
          case 'ready':
            this.emit('ready', undefined);
            break;
          case 'suggestion':
            this.emit('suggestion', message as SuggestionMessageType);
            break;
          case 'info':
            console.log('[AIController] info:', message);
            break;
          default:
            break;
        }
      };

      // AIへrulesを送信し、readyが返ってくるのを待つ
      if (this.worker) {
        this.worker.postMessage({ type: 'rules' });
      }
      await new Promise<void>((resolve) => {
        const handler = () => {
          this.off('ready', handler);
          this.setStatus(AI_STATUS.READY);
          resolve();
        };
        this.on('ready', handler);
      });

      return;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.setStatus(AI_STATUS.ERROR, `初期化エラー: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * AIに開始メッセージを送信
   */
  private start(initialGameState: GameStateType): void {
    if (!this.worker) {
      return;
    }

    // AIにstartを送信
    const startMsg = {
      type: 'start',
      ...initialGameState,
    };
    this.worker.postMessage(startMsg);

    this.setStatus(AI_STATUS.RUNNING);
  }

  /**
   * AIに最適な手を要求
   */
  private async requestSuggestion(): Promise<SuggestionMessageType> {
    if (!this.worker) {
      throw new Error('Workerが初期化されていません');
    }

    // AIにsuggestを送信し、suggestionが返ってくるのを待つ
    this.worker.postMessage({ type: 'suggest' });
    return new Promise<SuggestionMessageType>((resolve) => {
      const handler = (data: unknown) => {
        this.off('suggestion', handler);
        // 型安全のためのキャスト
        resolve(data as SuggestionMessageType);
      };
      this.on('suggestion', handler);
    });
  }

  /**
   * AIの提案した手を適用
   */
  private applyMove(move: MoveType | null): void {
    if (!move || !this.worker) {
      return;
    }

    // AIにplayを送信
    this.worker.postMessage({
      type: 'play',
      move,
    });
  }

  /**
   * workerを停止
   */
  private stopWorker(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  /**
   * AIに新しいピースを追加
   * @param piece - 追加するピースの種類
   */
  private addPieceToQueue(piece: string): void {
    if (!this.worker) {
      return;
    }

    // AIにnew_pieceを送信
    this.worker.postMessage({
      type: 'new_piece',
      piece,
    });
  }

  /**
   * n手先までの計算を実行
   * @param initialGameState - 初期ゲーム状態
   * @param moves - 計算する手数
   * @param delayMs - 1手当たりの探索時間（ミリ秒）
   * @param nextSize - AIが計算に使用するネクストの数（常にこの数だけ保持される）
   * @returns - 各手の結果
   */
  async calculateMoves(
    initialGameState: GameStateType,
    moves: number,
    delayMs = 1000,
    nextSize = 5,
  ): Promise<AIResultType[]> {
    // クラスを初期化
    await this.initialize();

    // キューを設定
    const allQueue = [...initialGameState.queue];
    const initialQueue = allQueue.slice(0, nextSize); // 先頭nextSize個を取得
    const remainingQueue = allQueue.slice(nextSize); // 残りのキュー

    // 探索を開始する条件（盤面やネクスト、ホールド等）をAIに渡す
    this.start({
      ...initialGameState,
      queue: initialQueue,
    });

    // 探索を開始する条件も履歴の最初のmoveとして返す
    const firstMove = JSON.parse(JSON.stringify({
      action: '',
      move: null,
      board: initialGameState.board,
      next: initialGameState.queue,
      hold: initialGameState.hold,
    }));

    const results: AIResultType[] = [];
    results.push(firstMove);

    // 各手の計算を行う
    // eslint-disable-next-line no-await-in-loop
    for (let i = 1; i < moves + 1; i += 1) {
      console.log(`[AIController] ${i}手目の計算のため${delayMs}ms待機します`);
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => {
        setTimeout(resolve, delayMs);
      });

      // eslint-disable-next-line no-await-in-loop
      const suggestion = await this.requestSuggestion();
      console.log('[AIController] suggestion:', suggestion);
      if (suggestion && suggestion.bestMove) {
        results.push(suggestion.bestMove);
        this.applyMove(suggestion.bestMove.move);

        // 残りのキューから新しいミノを追加
        if (remainingQueue.length > 0) {
          const nextPiece = remainingQueue.shift();
          if (nextPiece) {
            this.addPieceToQueue(nextPiece);
          }
        }
      }
    }

    this.setStatus(AI_STATUS.RUNNING_FINISHED, `${moves}手先まで計算完了`);

    // workerを停止
    this.stopWorker();

    return results;
  }
}
