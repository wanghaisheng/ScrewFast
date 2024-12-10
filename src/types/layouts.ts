import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import type { Props as LayoutProps } from '@/layouts/MainLayout.astro';

export type LayoutType = 'navbar' | 'mega' | 'vertical';

export interface Layouts {
  navbar: AstroComponentFactory;
  mega: AstroComponentFactory;
  vertical: AstroComponentFactory;
}

// Optional: Add type helper for layout components
export type LayoutComponent = AstroComponentFactory;

// Optional: Add type helper for layout props
export type LayoutComponentProps = LayoutProps;
