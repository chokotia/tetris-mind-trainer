import { Store } from 'vuex';
import { RootState } from '../store';

/**
 * アプリの状態を定期的に自動保存するクラス
 */
export class AutoSave {
  private store: Store<RootState>;

  private intervalId: number | null = null;

  private saveInterval: number;

  /**
   * @param store Vuexストア
   * @param saveIntervalMs 保存間隔（ミリ秒）
   */
  constructor(store: Store<RootState>, saveIntervalMs = 60000) {
    this.store = store;
    this.saveInterval = saveIntervalMs;
  }

  /**
   * アプリ起動時にローカルストレージからデータを読み込む
   */
  loadInitialData(): void {
    try {
      // 各モジュールのロード処理を実行
      this.store.dispatch('settings/loadSettings');
      this.store.dispatch('tetrisBoard/loadState');
      this.store.dispatch('drawMode/loadDrawMode');
      this.store.dispatch('aiResults/loadResults');
      this.store.dispatch('appMode/loadMode');
      console.log('アプリケーションの状態をローカルストレージから読み込みました');
    } catch (error) {
      console.error('アプリケーション状態の読み込み中にエラーが発生しました:', error);
    }
  }

  /**
   * 定期的な自動保存を開始する
   */
  startAutoSave(): void {
    if (this.intervalId !== null) {
      // 既に実行中の場合は一旦クリア
      this.stopAutoSave();
    }

    // 定期的な保存処理を開始
    this.intervalId = window.setInterval(() => {
      this.saveAllData();
    }, this.saveInterval);

    console.log(`自動保存を開始しました (${this.saveInterval / 1000}秒間隔)`);
  }

  /**
   * 定期的な自動保存を停止する
   */
  stopAutoSave(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('自動保存を停止しました');
    }
  }

  /**
   * 全てのモジュールのデータを手動で保存する
   */
  saveAllData(): void {
    try {
      // 各モジュールの保存処理を実行
      this.store.dispatch('settings/saveSettings', this.store.getters['settings/settings']);
      this.store.dispatch('tetrisBoard/saveState');
      this.store.dispatch('drawMode/saveDrawMode');
      this.store.dispatch('aiResults/saveResults');
      this.store.dispatch('appMode/saveMode');
      console.log('アプリケーションの状態をローカルストレージに保存しました');
    } catch (error) {
      console.error('アプリケーション状態の保存中にエラーが発生しました:', error);
    }
  }
}

export default AutoSave;
