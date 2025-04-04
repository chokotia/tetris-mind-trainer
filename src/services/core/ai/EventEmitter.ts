/**
 * イベントエミッターのベースクラス
 * イベントリスナーの管理機能を提供
 */
export default class EventEmitter {
  private eventListeners: Map<string, Set<(data: unknown) => void>>;

  constructor() {
    this.eventListeners = new Map();
  }

  /**
   * イベントリスナーを登録
   * @param eventName - イベント名
   * @param callback - コールバック関数
   */
  protected on(eventName: string, callback: (data: unknown) => void): void {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, new Set());
    }
    const listeners = this.eventListeners.get(eventName);
    if (listeners) {
      listeners.add(callback);
    }
  }

  /**
   * イベントリスナーを削除
   * @param eventName - イベント名
   * @param callback - コールバック関数
   */
  protected off(eventName: string, callback: (data: unknown) => void): void {
    if (this.eventListeners.has(eventName)) {
      const listeners = this.eventListeners.get(eventName);
      if (listeners) {
        listeners.delete(callback);
      }
    }
  }

  /**
   * イベントを発火
   * @param eventName - イベント名
   * @param data - イベントデータ
   */
  protected emit(eventName: string, data: unknown): void {
    if (this.eventListeners.has(eventName)) {
      const listeners = this.eventListeners.get(eventName);
      if (listeners) {
        listeners.forEach((callback) => callback(data));
      }
    }
  }
}
