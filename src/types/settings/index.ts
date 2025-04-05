import { BoardSettings } from './board';
import { AISettings } from './ai';

export interface GameSettings {
  nextQueueMode: string;
}

export interface Settings {
  boardSettings: BoardSettings;
  aiSettings: AISettings;
  gameSettings: GameSettings;
}

export {
  BoardSettings,
  AISettings,
};
