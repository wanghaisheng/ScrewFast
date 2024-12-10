export type CardLayoutType = '1x1' | '2x2' | '3x3' | '4x4';

export interface ContentCard {
  author: {
    name: string;
    avatar?: string;
  };
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  metrics?: {
    likes?: number;
    comments?: number;
  };
  thumbnail?: string;
  isPromoted?: boolean;
  promotedBy?: string;
}

export interface CardViewProps {
  cards: ContentCard[];
  cardsPerRow: 1 | 2 | 3 | 4; // Maximum cards per row
}