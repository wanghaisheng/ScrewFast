import type { ProcessedImage } from '@utils/imageProcessing';

export interface CTA {
  text: string;
  url: string;
  type?: 'primary' | 'secondary';
}

export interface ImageBlock {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  ctas?: CTA[];
  textPosition?: 'top-center' | 'bottom-left';
  processed?: ProcessedImage | null;  // Add processed image type
}

export interface Row {
  images: ImageBlock[];
}

export interface GalleryProps {
  title: string;
  subtitle?: string;
  rows: Row[];
}

// Additional type helpers if needed
export type TextPosition = 'top-center' | 'bottom-left';
export type ValidRowSize = 1 | 2 | 3;

// Utility type for processed rows
export interface ProcessedRow extends Omit<Row, 'images'> {
  images: (ImageBlock & { processed: ProcessedImage | null })[];
}

export interface ProcessedGalleryData {
  title: string;
  subtitle?: string;
  rows: ProcessedRow[];
}