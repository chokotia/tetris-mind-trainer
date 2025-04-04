import { QUEUE_GENERATION_MODE, AI_WEIGHT, DRAW_MODE, MINO, TETRIS_BOARD_CELL } from '../utils/tetrisDef';

// セルの座標
export type XYCoordinates = {
  x: number;
  y: number;
}

// ミノの種類
export type MinoType = typeof MINO[keyof typeof MINO];

// 盤面のセルの型
export type TetrisBoardCellType = typeof TETRIS_BOARD_CELL[keyof typeof TETRIS_BOARD_CELL];

// 盤面の定義（20行10列の配列）
export type BoardType = TetrisBoardCellType[][];

// ミノのキュー
export type QueueType = MinoType[];

// 編集モード
export type DrawModeType = typeof DRAW_MODE[keyof typeof DRAW_MODE];

// ネクストキューの生成モード
export type QueueGenerationModeType = typeof QUEUE_GENERATION_MODE[keyof typeof QUEUE_GENERATION_MODE];

// AIの重み付けの型定義
export type AiWeightType = typeof AI_WEIGHT[keyof typeof AI_WEIGHT];