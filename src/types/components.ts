import type { HeaderProduct } from './products';

export interface ProductSelectorProps {
  products: HeaderProduct[];
  onChange?: (selectedIds: string[]) => void;
}

export interface ProductHeaderProps {
  products: HeaderProduct[];
}