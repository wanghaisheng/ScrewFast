import type { LayoutType } from './layouts';

export interface MenuConfig {
  type: LayoutType;
  defaultType: LayoutType;
  allowedTypes: LayoutType[];
}

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  children?: MenuItem[];
}

export interface NavData {
  menu: MenuItem[];
  config?: Partial<MenuConfig>;
}