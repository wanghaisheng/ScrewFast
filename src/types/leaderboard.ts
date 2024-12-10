export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  avatar?: string;
  change?: 'up' | 'down' | 'same';
  lastUpdated?: string;
  badges?: string[];
}

export interface LeaderboardCategory {
  id: string;
  title: string;
  description?: string;
  timeFrame?: string;
  entries: LeaderboardEntry[];
}

export interface LeaderboardData {
  categories: LeaderboardCategory[];
  lastUpdated: string;
  totalPlayers: number;
  activePlayers: number;
  engagementRate: string;
}