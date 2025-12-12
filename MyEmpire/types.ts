
export interface Resources {
  gold: number;
  army: number;
  legitimacy: number; // Stability/Influence
  food: number;
  day: number;
}

export interface Choice {
  text: string;
  effect?: (currentResources: Resources) => Partial<Resources>;
  nextSceneId: string;
}

export interface Scene {
  id: string;
  title: string;
  paragraphs: string[];
  choices: Choice[];
}

export type ViewState = 'MENU' | 'GAME_VN' | 'GAME_MAP';

export interface Province {
  id: string;
  name: string;
  status: 'loyal' | 'rebellious' | 'occupied';
  income: number;
}