import { MinoType, TetrisBoardCellType } from '../types/tetris';

export interface BoardState {
  hold: MinoType | null;
  next: (MinoType | null)[];
  grid: TetrisBoardCellType[][];
  isGridHidden: boolean;
}
