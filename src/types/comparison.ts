// Define valid category types
export type ProductCategory = 'earbuds' | 'drones';

// Define feature structure
export interface ComparisonFeature {
  label: string;
  path: string;
}

// Define category features map
export interface CategoryFeatures {
  [key: string]: ComparisonFeature[];
}
// Define comparison data structure
export interface ComparisonData {
  headers: string[];
  features: {
    name: string;
    values: string[];
  }[];
}

export interface ProductSpec {
  [key: string]: {
    [key: string]: string | number | boolean | ProductSpec;
  };
}