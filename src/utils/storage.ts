const STORAGE_ERROR_MESSAGES = {
  SAVE_FAILED: 'storage.error.saveFailed',
  LOAD_FAILED: 'storage.error.loadFailed',
} as const;

type StorageErrorMessageKey = keyof typeof STORAGE_ERROR_MESSAGES;

class StorageError extends Error {
  cause?: unknown;

  constructor(message: StorageErrorMessageKey, cause?: unknown) {
    super(STORAGE_ERROR_MESSAGES[message]);
    this.name = 'StorageError';
    if (cause) {
      this.cause = cause;
    }
  }
}

const storage = {
  save: (key: string, value: unknown): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw new StorageError('SAVE_FAILED', error);
    }
  },
  load: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      throw new StorageError('LOAD_FAILED', error);
    }
  },
};

export default storage;
