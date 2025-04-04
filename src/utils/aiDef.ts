// AIの状態
export const AI_STATUS = {
  UNINITIALIZED: '未初期化',
  INITIALIZING: '初期化中',
  READY: '準備完了',
  RUNNING: '実行中',
  STOPPED: '停止中',
  ERROR: 'エラー',
} as const;

// ミノの向き
export const ORIENTATION = {
  NORTH: 'north',
  EAST: 'east',
  SOUTH: 'south',
  WEST: 'west',
} as const;

// ミノの回転
export const SPIN = {
  NONE: 'none',
  MINI: 'mini',
  FULL: 'full',
} as const;
