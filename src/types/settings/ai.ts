import { AiWeightType } from '../tetris';

export interface AISettings {
  searchTime: number;
  movesCount: number;
  weightsName: AiWeightType;
  nextSize: number;
  avoidPerfectClear: boolean;
}
