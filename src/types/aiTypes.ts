import { AI_STATUS, ORIENTATION, SPIN } from '@/utils/aiDef';
import {
  MinoType, XYCoordinates, BoardType, QueueType,
} from './tetris';

// AIの状態
export type AIStatus = typeof AI_STATUS[keyof typeof AI_STATUS];

// ミノの向き
export type Orientation = typeof ORIENTATION[keyof typeof ORIENTATION];

// ミノの回転
export type Spin = typeof SPIN[keyof typeof SPIN];

// ゲーム状態の定義
export type GameState = {
  weightsName: string;
  board: BoardType;
  queue: QueueType;
  hold: MinoType | null;
  combo: number;
  backToBack: boolean;
}

// ミノの位置情報
export type PieceLocation = {
  type: MinoType;
  orientation: Orientation;
  x: number;
  y: number;
  blockPositions: XYCoordinates[];
}

// ミノの配置（位置と回転）
export type Move = {
  location: PieceLocation;
  spin: Spin;
}

// 計算結果の各手の情報
export type MoveResult = {
  action: string;
  move: Move | null;
  board: BoardType;
  next: QueueType;
  hold: MinoType | null;
}

// Worker用のメッセージ型
export type WorkerMessage = {
  type: string;
  [key: string]: unknown;
}

// AIからの提案メッセージ
export type SuggestionMessage = WorkerMessage & {
  type: 'suggestion';
  moves: MoveResult;
}
