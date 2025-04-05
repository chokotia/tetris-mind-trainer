import { GameSettings } from './game';
import { AISettings } from './ai';

export interface Settings {
  gameSettings: GameSettings;
  aiSettings: AISettings;
}

export {
  AISettings,
  GameSettings,
};
