import { computed } from 'vue';
import { Store } from 'vuex';
import type { TetrisBoardCellType, DrawModeType, XYCoordinates } from '../types/tetris';
import { DRAW_MODE, TetrisBoardCell } from '../utils/tetrisDef';
import type { RootState } from '../store';

const drawCell = (
  coordinates: XYCoordinates,
  mode: DrawModeType,
  store: Store<RootState>,
): void => {
  const { x, y } = coordinates;
  const tetrisBoard = computed(() => store.getters['tetrisBoard/tetrisBoard']);
  const newBoard = tetrisBoard.value.map((row: TetrisBoardCellType[]) => [...row]);

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

  store.commit('tetrisBoard/SET_TETRIS_BOARD', newBoard);
};

export default drawCell;
