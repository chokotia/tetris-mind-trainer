import type { TetrisBoardCellType, DrawModeType } from '../types/tetris';
import { DRAW_MODE, TetrisBoardCell } from '../utils/tetrisDef';

const drawCell = (
  board: TetrisBoardCellType[][],
  x: number,
  y: number,
  mode: DrawModeType,
): TetrisBoardCellType[][] => {
  const newBoard = board.map((row) => [...row]);

  switch (mode) {
    case DRAW_MODE.GRAY:
      newBoard[y][x] = TetrisBoardCell.GRAY;
      break;
    case DRAW_MODE.DELETE:
      newBoard[y][x] = TetrisBoardCell.NULL;
      break;
    // TODO: 今後実装予定
    // case DRAW_MODE.AUTO:
    //   newBoard[y][x] = TetrisBoardCell.Gray;
    //   break;
    default:
      throw new Error(`Invalid draw mode: ${mode}`);
  }

  return newBoard;
};

export default drawCell;
