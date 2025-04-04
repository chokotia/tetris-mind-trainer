import { Settings, BoardSettings, AISettings } from '../../types/settings';
import {
  QUEUE_GEN_MODE, BOARD_CONSTRAINTS, AI_CONSTRAINTS,
} from '../tetrisDef';

export function validateAISettings(aiSettings: AISettings): boolean {
  if (!aiSettings || typeof aiSettings !== 'object') {
    return false;
  }

  return (
    aiSettings.searchTime >= AI_CONSTRAINTS.MIN_SEARCH_TIME
    && aiSettings.searchTime <= AI_CONSTRAINTS.MAX_SEARCH_TIME
    && aiSettings.movesCount >= AI_CONSTRAINTS.MIN_MOVES_COUNT
    && aiSettings.movesCount <= AI_CONSTRAINTS.MAX_MOVES_COUNT
  );
}

export function validateBoardSettings(boardSettings: BoardSettings): boolean {
  if (!boardSettings || typeof boardSettings !== 'object') {
    return false;
  }

  const isValidBoardSize = (
    boardSettings.width >= BOARD_CONSTRAINTS.MIN_WIDTH
    && boardSettings.width <= BOARD_CONSTRAINTS.MAX_WIDTH
    && boardSettings.height >= BOARD_CONSTRAINTS.MIN_HEIGHT
    && boardSettings.height <= BOARD_CONSTRAINTS.MAX_HEIGHT
  );

  const isValidNextCount = (
    boardSettings.nextCount >= BOARD_CONSTRAINTS.MIN_NEXT_COUNT
    && boardSettings.nextCount <= BOARD_CONSTRAINTS.MAX_NEXT_COUNT
  );

  const isValidBlockRange = (
    boardSettings.blockRange.min >= BOARD_CONSTRAINTS.MIN_BLOCK
    && boardSettings.blockRange.max <= BOARD_CONSTRAINTS.MAX_BLOCK
    && boardSettings.blockRange.min <= boardSettings.blockRange.max
  );

  const isValidMinoMode = Object.values(QUEUE_GEN_MODE).includes(boardSettings.minoMode);

  return isValidBoardSize && isValidNextCount && isValidBlockRange && isValidMinoMode;
}

export function validateSettings(settings: Settings): boolean {
  if (!settings || typeof settings !== 'object') {
    return false;
  }

  const { boardSettings, aiSettings } = settings;

  return (
    validateBoardSettings(boardSettings)
    && validateAISettings(aiSettings)
  );
}
