export interface GroupMember {
  avatar: string;
  name: string;
  role?: 'admin' | 'moderator' | 'member';
}

export interface GroupCard {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  memberCount: number;
  members: GroupMember[];
  featured?: boolean;
  category?: string;
}

export interface GroupCardViewProps {
  groups: GroupCard[];
  cardsPerRow: 1 | 2 | 3 | 4;
  showCategory?: boolean;
}