import { QueueGenModeType } from '../tetris';

export interface BoardSettings {
  width: number;
  height: number;
  nextCount: number;
  blockRange: {
    min: number;
    max: number;
  };
  minoMode: QueueGenModeType;
}
