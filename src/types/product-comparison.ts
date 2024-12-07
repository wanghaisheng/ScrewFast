export interface ComparisonProduct {
  id: string;
  name: string;
  image: string;
  specs: {
    [key: string]: string;
  };
}

export interface ComparisonSpec {
  key: string;
  values: string[];
}

export interface ComparisonSection {
  title: string;
  specs: ComparisonProduct[];
}

export interface ProductComparison {
  products: ComparisonProduct[];
  sections: ComparisonSection[];
}