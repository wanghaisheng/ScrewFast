export type ImageFormat = 'png' | 'jpg' | 'jpeg' | 'gif' | 'webp' | 'avif' | 'svg';

export interface Author {
  name: string;
  avatar?: string;
  role?: string;
}

export interface ContentCard {
  id: string;
  title: string;
  description?: string;
  author: Author;
  date: string;
  readTime: string;
  thumbnail?: string;
  tags: string[];
  metrics?: {
    likes?: number;
    comments?: number;
    views?: number;
  };
  featured?: boolean;
  category?: string;
}

export interface SlideCardViewProps {
  title: string;
  cards: ContentCard[];
  seeAllUrl: string;
  seeAllLayout?: 1 | 2 | 3 | 4;
}