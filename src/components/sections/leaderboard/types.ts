export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  avatar?: string;
  change?: 'up' | 'down' | 'same';
  badges?: string[];
}

export interface LeaderboardCategory {
  id: string;
  title: string;
  description?: string;
  timeFrame?: string;
  entries: LeaderboardEntry[];
}

export interface LeaderboardStats {
    totalPlayers: number;
    activePlayers: number;
    engagementRate: string;
    lastUpdated: string;
    labels: {
      totalPlayers: string;
      activePlayers: string;
      engagementRate: string;
      lastUpdated: string;
    };
}

export interface LeaderboardData {
  title: string;
  subTitle: string;
  stats: LeaderboardStats;
  categories: LeaderboardCategory[];
}

export interface TableLayout {
  rows: number;
  cols: number;
  data: TableLayoutData[];
}

export interface TableLayoutData {
  title: string;
  description?: string;
  timeFrame?: string;
  entries: LeaderboardEntry[];
}

export type PresetLayout = 
  | { type: '1x6'; data: TableLayoutData[]; }
  | { type: '2x3'; data: TableLayoutData[]; }
  | { type: '3x2'; data: TableLayoutData[]; }
  | { type: 'custom'; layout: TableLayout; };

export type LayoutType = '1' | '2' | '3';

export interface TableViewProps {
  data: LeaderboardData;
  layout: LayoutType;
}

