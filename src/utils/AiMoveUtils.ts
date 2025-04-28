import type { PieceLocationType } from '@/types/aiTypes';

/**
 * ミノの位置範囲表示を取得する（x, y座標の範囲を一度に計算）
 * @param location ミノの位置情報
 * @param isXLeftToRight x方向のカウント方法（true: 左から、false: 右から）
 */
const getPositionRangeDisplay = (location: PieceLocationType, isXLeftToRight = true): string => {
  if (!location.blockPositions || location.blockPositions.length === 0) {
    return 'x:?, y:?';
  }

  const xValues = location.blockPositions.map((pos) => pos.x);
  const yValues = location.blockPositions.map((pos) => pos.y);

  const minX = Math.min(...xValues) + 1;
  const maxX = Math.max(...xValues) + 1;
  const minY = Math.min(...yValues) + 1;
  const maxY = Math.max(...yValues) + 1;

  return `x:${minX}-${maxX}, y:${minY}-${maxY}`;
};

export default getPositionRangeDisplay;
