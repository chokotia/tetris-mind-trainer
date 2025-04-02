import { QUEUE_GENERATION_MODE, AI_WEIGHT, DRAW_MODE, MINO, TetrisBoardCell } from '../utils/tetrisDef';

// セルの座標
export type XYCoordinates = {
  x: number;
  y: number;
}

// ミノの種類
export type MinoType = typeof MINO[keyof typeof MINO];

// 盤面のセルの型
export type TetrisBoardCellType = typeof TetrisBoardCell[keyof typeof TetrisBoardCell];

// 編集モード
export type DrawModeType = typeof DRAW_MODE[keyof typeof DRAW_MODE];

// ネクストキューの生成モード
export type QueueGenerationModeType = typeof QUEUE_GENERATION_MODE[keyof typeof QUEUE_GENERATION_MODE];

// AIの重み付けの型定義
export type AiWeightType = typeof AI_WEIGHT[keyof typeof AI_WEIGHT];