import { MINO_TYPE, BLOCK_TYPE } from '../utils/tetrisDef';

export interface BoardState {
  hold: MINO_TYPE | null;
  next: (MINO_TYPE | null)[];
  grid: BLOCK_TYPE[][];
  isGridHidden: boolean;
}
