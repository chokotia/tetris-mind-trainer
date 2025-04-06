/**
 * 盤面の幅と高さ
 */
export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

/**
 * ネクストキューの生成モード
 */
export const QUEUE_GEN_MODE = {
  RANDOM: 'random',
  SEVEN_BAG_RANDOM: '7bag-random',
  SEVEN_BAG_PURE: '7bag-pure',
} as const;

/**
 * 描画モード
 */
export const DRAW_MODE = {
  AUTO: 'Auto',
  GRAY: 'Gray',
  DELETE: 'Delete',
} as const;

/**
 * ミノの種類
 */
export const MINO = {
  I: 'I',
  O: 'O',
  T: 'T',
  L: 'L',
  J: 'J',
  S: 'S',
  Z: 'Z',
} as const;

/**
 * 盤面のセルの型
 */
export const TETRIS_BOARD_CELL = {
  I: 'I',
  O: 'O',
  T: 'T',
  L: 'L',
  J: 'J',
  S: 'S',
  Z: 'Z',
  GRAY: 'G',
  WHITE: 'W',
  NULL: null,
} as const;

/**
 * AIの重み付けの値定義
 */
export const AI_WEIGHT = {
  DEFAULT: 'default',
  RIGHT_WELL_FLAT: 'rightWellFlat',
  STABLE_STACK: 'stableStack',
  CC_STANDARD_LIKE: 'cc_standard_like',
  CC_FAST_LIKE: 'cc_fast_like',
} as const;

/**
 * 空の盤面
 */
export const EMPTY_TETRIS_BOARD = Array(BOARD_HEIGHT)
  .fill(null)
  .map(() => Array(BOARD_WIDTH).fill(null));

/**
 * テスト用の盤面
 */
export const TEST_TETRIS_BOARD = Array(BOARD_HEIGHT)
  .fill(null)
  .map((_, rowIndex) => {
    if (rowIndex === 17) {
      return ['G', 'G', 'G', 'G', 'G', 'G', 'G', null, null, null];
    }
    if (rowIndex === 18) {
      return [null, 'T', 'S', 'S', null, null, null, null, null, null];
    }
    if (rowIndex === 19) {
      return ['T', 'T', 'T', 'S', 'S', 'I', 'I', 'I', 'I', null];
    }
    return Array(BOARD_WIDTH).fill(null);
  });

// ミノの形状定義（簡略化版）
export const MINO_SHAPES = {
  I: [
    [1, 1, 1, 1],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
};
