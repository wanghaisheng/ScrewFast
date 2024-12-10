import type { ProductCategory } from '@/types/comparison';

export function validateCategory(category: string | null): ProductCategory {
  const validCategories: ProductCategory[] = ['earbuds', 'drones'];
  return validCategories.includes(category as ProductCategory) 
    ? (category as ProductCategory) 
    : 'earbuds';
}