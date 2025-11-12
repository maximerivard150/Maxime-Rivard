export interface Player {
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  attack: number;
  xp: number;
  xpMax: number;
  money: number;
  bankMoney: number;
  inventory: string[];
  equippedWeapons: string[];
  equippedArmor: Record<string, string | null>;
  equippedMagic: Record<string, string | null>;
  currentCity: string;
  country: string;
  stats: {
    force: number;
    intelligence: number;
    charisme: number;
    dexterite: number;
    constitution: number;
    sagesse: number;
    chance: number;
  };
  skills: Skills;
  time: {
    hour: number;
    day: number;
    month: number;
    year: number;
  };
  season: string;
  weather: string;
}

export interface Enemy {
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  attack: number;
  rewardMoney: number;
  rewardXp: number;
}

export interface Message {
  text: string;
  sender: 'system' | 'player' | 'ai' | 'combat';
  typewriter?: boolean;
}

export type GameView = 
  | 'main' 
  | 'inventory' 
  | 'combat' 
  | 'shop' 
  | 'job' 
  | 'travel' 
  | 'stats'
  | 'skills'
  | 'braquage'
  | 'services'
  | 'saveLoad'
  | 'shopHub'
  | 'grocery';

export interface ShopCategory {
  [itemName: string]: number;
}

export interface ElectroStock {
  [category: string]: ShopCategory;
}

export interface GroceryStock {
    [category: string]: string[];
}

export interface CountryData {
  "Grandes Villes": string[];
  "Villes": {
    [majorCity: string]: string[];
  };
}

export interface Countries {
  [countryName: string]: CountryData;
}

export interface Vehicle {
  marque: string;
  modèles: string[];
}

export interface JobData {
    nom: string;
    salaire: number;
    xp: number;
}

export interface JobCategory {
    [id: string]: JobData;
}

export interface Jobs {
    [category: string]: JobCategory;
}

export interface SaveSlot {
  timestamp: number;
  player: Player;
}

// --- SKILLS ---

export interface Skill {
  level: number;
  xp: number;
  xpMax: number;
}

export interface Skills {
  intellectual: Record<string, Skill>;
  artistic: Record<string, Skill>;
  musical: Record<string, Skill>;
  manual: Record<string, Skill>;
  social: Record<string, Skill>;
  physical: Record<string, Skill>;
  misc: Record<string, Skill>;
}