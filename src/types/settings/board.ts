import { MINO_MODE_TYPE } from '../../utils/tetrisDef';

export interface BoardSettings {
  width: number;
  height: number;
  nextCount: number;
  blockRange: {
    min: number;
    max: number;
  };
  minoMode: MINO_MODE_TYPE;
}
