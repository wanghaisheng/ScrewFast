export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductHeaderProps {
  colors?: ProductColor[];
  defaultColor?: string;
  title: string;
  subtitle?: string;
  price?: string;
  image?: string;
}