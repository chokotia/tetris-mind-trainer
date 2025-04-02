import { QueueGenerationModeType } from '../../types/tetris';

export interface BoardSettings {
  width: number;
  height: number;
  nextCount: number;
  blockRange: {
    min: number;
    max: number;
  };
  minoMode: QueueGenerationModeType;
}
