/**
 * ミノ生成モードの値定義
 */
export const MINO_MODE = {
  RANDOM: 'random',
  SEVEN_BAG_RANDOM: '7bag-random',
  SEVEN_BAG_PURE: '7bag-pure',
} as const;

/**
 * ミノ生成モードの型定義
 */
export type MINO_MODE_TYPE = typeof MINO_MODE[keyof typeof MINO_MODE];

/**
 * AIの重み付けの値定義
 */
export const AiWeight = {
  DEFAULT: 'default',
  RIGHT_WELL_FLAT: 'rightWellFlat',
  STABLE_STACK: 'stableStack',
  CC_STANDARD_LIKE: 'cc_standard_like',
  CC_FAST_LIKE: 'cc_fast_like',
} as const;

/**
 * AIの重み付けの型定義
 */
export type AiWeightType = typeof AiWeight[keyof typeof AiWeight];

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
