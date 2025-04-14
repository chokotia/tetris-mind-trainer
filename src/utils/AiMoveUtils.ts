import type { PieceLocationType } from '@/types/aiTypes';

/**
 * ミノの位置範囲表示を取得する（x, y座標の範囲を一度に計算）
 */
const getPositionRangeDisplay = (location: PieceLocationType): string => {
  if (!location.blockPositions || location.blockPositions.length === 0) {
    return `x:${location.x}-?, y:${location.y}-?`;
  }

  const xValues = location.blockPositions.map((pos) => pos.x);
  const yValues = location.blockPositions.map((pos) => pos.y);

  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  return `x:${minX}-${maxX}, y:${minY}-${maxY}`;
};

export default getPositionRangeDisplay;
