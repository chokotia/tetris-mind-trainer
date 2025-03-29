import { BoardSettings } from './board';
import { AISettings } from './ai';

export interface Settings {
  boardSettings: BoardSettings;
  aiSettings: AISettings;
}

export {
  BoardSettings,
  AISettings,
};
