import siteconfig from "@data/site.json";

// Define the structure of your i18n data
export interface LocalizedStrings {
  pageTitle: string;
  pageDescription: string;
  title: string;
  subTitle: string;
  stats: {
    totalPlayers: string;
    activePlayers: string;
    engagementRate: string;
    lastUpdated: string;
  };
  categories: {
    [key: string]: {
      title: string;
      description: string;
      timeFrame?: string;
    };
  };
}

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
      entries: LeaderboardEntry[];
}

export interface LeaderboardStats {
  totalPlayers: number;
  activePlayers: number;
  engagementRate: string;
  lastUpdated: string;
}

export interface LeaderboardData {
  i18n: {
    [K in keyof typeof siteconfig.supportedLangLabels]: LocalizedStrings;
  };
  data: {
    stats: LeaderboardStats;
    categories: LeaderboardCategory[];
  };
}

export function formatScore(score: number): string {
  return new Intl.NumberFormat().format(score);
}

export function formatDate(dateString: string, lang: string): string {
  return new Date(dateString).toLocaleDateString(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Add export for the processed data type if not already present
export type ProcessedLeaderboardData = {
  i18n: LocalizedStrings;
  data: {
    stats: LeaderboardStats;
    categories: LeaderboardCategory[];
  };
  categories: (LeaderboardCategory & {
    title: string;
    description: string;
    timeFrame?: string;
  })[];
  stats: LeaderboardStats & {
    labels: {
      totalPlayers: string;
      activePlayers: string;
      engagementRate: string;
      lastUpdated: string;
    };
  };
};