export interface NavItem {
  title?: string;
  items: {
    name: string;
    href: string;
    icon: string;
    badge?: {
      text: string;
      color?: string;
    };
  }[];
}
export interface Badge {
  text: string;
  variant?: 'primary' | 'secondary' | 'default';
}

export interface MenuItem {
  label: string;
  href: string;
  icon?: string;
  badge?: Badge;
  category?: string;
  submenu?: MenuItem[];
}