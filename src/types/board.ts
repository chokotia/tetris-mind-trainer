import { MinoType, TetrisBoardCellType } from './tetris';

export interface BoardState {
  hold: MinoType | null;
  next: (MinoType | null)[];
  grid: TetrisBoardCellType[][];
  isGridHidden: boolean;
}
