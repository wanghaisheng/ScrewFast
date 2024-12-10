import type { ImageMetadata } from 'astro';

export interface OfficeImage {
  src: string;
  alt: string;
  caption: string;
}

export interface ProcessedOfficeImage extends OfficeImage {
  processed: {
    src: ImageMetadata;
    width: number;
    height: number;
    format: string;
  } | null;
}

export interface OfficeSliderProps {
  title: string;
  description: string;
  images: OfficeImage[];
}