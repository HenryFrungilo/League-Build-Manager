export interface Item {
  id: string;
  name: string;
  cost: number;
  description: string;
  icon?: string;
}

export interface Champion {
  name: string;
  title: string;
  role: string;
  icon?: string;
}

export interface BuildData {
  champion: Champion;
  items: Item[];
  live: boolean;
}

export const BUILD_SIZE = 6;
