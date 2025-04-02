import { AiWeightType } from '../../types/tetris';

export interface AISettings {
  searchTime: number;
  movesCount: number;
  weightsName: AiWeightType;
}
