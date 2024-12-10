import type { CollectionEntry } from 'astro:content';

// Base interfaces remain the same
export interface ProductHighlight {
  icon: string;
  title: string;
  description: string;
}

export interface KeySpec {
  label: string;
  value: string;
}

export interface ProductSpec {
  [category: string]: {
    [key: string]: string;
  };
}

export interface ProductPrice {
  amount: string;
  original?: string;
  discount?: string;
}

export interface ProductColor {
  name: string;
  value: string;
}

// Define SpecEntry type
export type SpecEntry = CollectionEntry<'specs'>;

// Define common product data interface
export interface ProductData {
  id: string;
  name: string;
  image: string;
  description: string;
}

// Header product interface
export interface HeaderProduct extends ProductData {
  price: ProductPrice;
  colors?: ProductColor[];
  buyLink: string;
}

// Full product interface
export interface Product extends ProductData {
  price: string;
  highlights: ProductHighlight[];
  keySpecs?: KeySpec[];
  specs: ProductSpec;
  category: string;
  order?: number;
  featured?: boolean;
}

// Type guard functions
export function isSpecEntry(product: Product | SpecEntry): product is SpecEntry {
  return 'collection' in product;
}

export function isProduct(product: Product | SpecEntry): product is Product {
  return !('collection' in product);
}

// Data transformation functions
export function getProductData(product: Product | SpecEntry): ProductData {
  if (isSpecEntry(product)) {
    return {
      id: product.data.productId,
      name: product.data.title,
      image: product.data.image || '',
      description: product.data.description,
    };
  }
  return {
    id: product.id,
    name: product.name,
    image: product.image,
    description: product.description,
  };
}