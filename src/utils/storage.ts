const storage = {
  save: (key: string, value: unknown): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('ストレージへの保存に失敗しました', error);
      throw error;
    }
  },
  load: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('ストレージからの読み込みに失敗しました', error);
      throw error;
    }
  },
};

export default storage;
