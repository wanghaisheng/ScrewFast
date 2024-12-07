export interface SpecItem {
  key: string;
  value: string;
}

export interface SpecGroup {
  title: string;
  specs: SpecItem[];
}

export interface ProductSpecs {
  groups: SpecGroup[];
}