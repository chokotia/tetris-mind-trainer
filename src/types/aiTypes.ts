import { AI_STATUS, ORIENTATION, SPIN } from '@/utils/aiDef';
import {
  MinoType, XYCoordinates, BoardType, QueueType,
} from './tetris';

// AIの状態
export type AIStatusType = typeof AI_STATUS[keyof typeof AI_STATUS];

// ミノの向き
export type OrientationType = typeof ORIENTATION[keyof typeof ORIENTATION];

// ミノの回転
export type SpinType = typeof SPIN[keyof typeof SPIN];

// ゲーム状態の定義
export type GameStateType = {
  weightsName: string;
  board: BoardType;
  queue: QueueType;
  hold: MinoType | null;
  combo: number;
  backToBack: boolean;
}

// ミノの位置情報
export type PieceLocationType = {
  type: MinoType;
  orientation: OrientationType;
  x: number;
  y: number;
  blockPositions: XYCoordinates[];
}

// ミノの配置（位置と回転）
export type MoveType = {
  location: PieceLocationType;
  spin: SpinType;
}

// 計算結果の各手の情報
export type AIResultType = {
  action: string;
  move: MoveType | null;
  board: BoardType;
  next: QueueType;
  hold: MinoType | null;
}

// Worker用のメッセージ型
export type WorkerMessageType = {
  type: string;
  [key: string]: unknown;
}

// AIからの提案メッセージ
export type SuggestionMessageType = WorkerMessageType & {
  type: 'suggestion';
  bestMove: AIResultType;
}
