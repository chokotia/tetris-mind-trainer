/**
 * 盤面の幅と高さ
 */
export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

/**
 * ネクストキューの生成モード
 */
export const QUEUE_GENERATION_MODE = {
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
  NULL: undefined,
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
 * 盤面の制約値定義
 */
export const BOARD_CONSTRAINTS = {
  MIN_WIDTH: 3,
  MAX_WIDTH: 10,
  MIN_HEIGHT: 6,
  MAX_HEIGHT: 20,
  MIN_NEXT_COUNT: 3,
  MAX_NEXT_COUNT: 10,
  MIN_BLOCK: 0,
  MAX_BLOCK: 30,
} as const;

/**
 * AIの制約値定義
 */
export const AI_CONSTRAINTS = {
  MIN_SEARCH_TIME: 0.5,
  MAX_SEARCH_TIME: 10,
  MIN_MOVES_COUNT: 1,
  MAX_MOVES_COUNT: 20,
} as const;

/**
 * テトリスゲームのルール定義
 */
export const TETRIS_RULES = {
  BOARD: {
    MIN_WIDTH: 3,
    MAX_WIDTH: 10,
    MIN_HEIGHT: 6,
    MAX_HEIGHT: 20,
  },
  NEXT: {
    MIN_COUNT: 2,
    MAX_COUNT: 10,
  },
  BLOCKS: {
    MIN_COUNT: 0,
    MAX_COUNT: 30,
  },
  TOTAL_NEXT_COUNT: 100,
} as const;

/**
 * 空の盤面
 */
export const EMPTY_TETRIS_BOARD = Array(BOARD_HEIGHT)
  .fill(undefined)
  .map(() => Array(BOARD_WIDTH).fill(undefined));

/**
 * テスト用の盤面
 */
export const TEST_TETRIS_BOARD = Array(BOARD_HEIGHT)
  .fill(undefined)
  .map((_, rowIndex) => {
    if (rowIndex === 17) {
      return ['Gray', 'Gray', 'Gray', 'Gray', 'Gray', 'Gray', 'Gray', undefined, undefined, undefined];
    }
    if (rowIndex === 18) {
      return [undefined, 'T', 'S', 'S', undefined, undefined, undefined, undefined, undefined, undefined];
    }
    if (rowIndex === 19) {
      return ['T', 'T', 'T', 'S', 'S', 'I', 'I', 'I', 'I', undefined];
    }
    return Array(BOARD_WIDTH).fill(undefined);
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
