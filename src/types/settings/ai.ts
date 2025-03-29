import { AiWeightType } from '../../utils/tetrisDef';

export interface AISettings {
  searchTime: number;
  movesCount: number;
  weightsName: AiWeightType;
}
