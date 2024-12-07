import type { ImageMetadata } from 'astro';

export type ImageFormat = 'png' | 'jpg' | 'jpeg' | 'gif' | 'webp' | 'avif' | 'svg';

export interface ProcessedImage {
  src: ImageMetadata | string;
  width: number;
  height: number;
  format: ImageFormat;
}

// Helper type guard to check if value is ImageMetadata
export function isImageMetadata(value: any): value is ImageMetadata {
  return value && typeof value === 'object' && 'src' in value && 'width' in value && 'height' in value;
}

// Helper function to detect format from URL or filename
function detectImageFormat(src: string): ImageFormat {
  const extension = src.toLowerCase().split('.').pop();
  switch (extension) {
    case 'avif':
      return 'avif'
    case 'png':
      return 'png';
    case 'jpg':
    case 'jpeg':
      return 'jpeg';
    case 'gif':
      return 'gif';
    case 'webp':
      return 'webp';
    case 'avif':
      return 'avif';
    case 'svg':
      return 'svg';
    default:
      return 'jpeg'; // Default format if cannot detect
  }
}

export function processImage(src: string | undefined): ProcessedImage | null {
  if (!src) return null;

  // Handle remote URLs
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return {
      src: src,
      width: 1920,
      height: 1080,
      format: detectImageFormat(src)
    };
  }

  try {
    // Process local image
    const images = import.meta.glob<{ default: ImageMetadata }>(
      '/src/images/**/*.{jpeg,jpg,png,gif,webp,svg,avif}',
      { eager: true }
    );
    const importedImage = images[src]?.default;
    
    if (!importedImage) {
      console.error('Image import failed:', src);
      return null;
    }

    return {
      src: importedImage,
      width: importedImage.width,
      height: importedImage.height,
      format: detectImageFormat(importedImage.src)
    };
  } catch (error) {
    console.error('Error processing image:', error);
    return null;
  }
}
export function getImageSrc(src: ImageMetadata | string): string {
  return isImageMetadata(src) ? src.src : src;
}
