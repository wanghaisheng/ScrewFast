import type { ImageMetadata } from 'astro';

export type ImageFormat = 'png' | 'jpg' | 'jpeg' | 'gif' | 'webp' | 'avif' | 'svg';

export interface ProcessedImage {
  src: ImageMetadata | string;
  width: number;
  height: number;
  format: ImageFormat;
}

interface PlaceholderConfig {
  width?: number;
  height?: number;
  text?: string;
  format?: string;
  bgColor?: string;
  textColor?: string;
}

// Helper type guard to check if value is ImageMetadata
export function isImageMetadata(value: any): value is ImageMetadata {
  return value && typeof value === 'object' && 'src' in value && 'width' in value && 'height' in value;
}

// Helper function to detect format from URL or filename
function detectImageFormat(src: string): ImageFormat {
  const extension = src.toLowerCase().split('.').pop();
  switch (extension) {
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

// Create fallback image URL
function createPlaceholderUrl(config: PlaceholderConfig): string {
  const {
    width = 1200,
    height = 630,
    text = 'Image not found',
    bgColor = 'f7f6f6',
    textColor = '6d6e71'
  } = config;

  const encodedText = encodeURIComponent(text);
  return `https://images.placeholders.dev/?width=${width}&height=${height}&text=${encodedText}&bgColor=%23${bgColor}&textColor=%23${textColor}`;
}

export async function processImage(
  src: string | undefined,
  placeholderConfig?: PlaceholderConfig
): Promise<ProcessedImage> {
  if (!src) {
    return createFallbackImage('No image source provided', placeholderConfig);
  }

  // Handle remote URLs
  if (src.startsWith('http://') || src.startsWith('https://')) {
    try {
      const response = await fetch(src, { method: 'HEAD' });
      if (!response.ok) {
        console.warn(`Remote image not found: ${src}`);
        return createFallbackImage('Remote image not found', placeholderConfig);
      }

      return {
        src: src,
        width: placeholderConfig?.width || 1920,
        height: placeholderConfig?.height || 1080,
        format: detectImageFormat(src)
      };
    } catch (error) {
      console.error('Error fetching remote image:', error);
      return createFallbackImage('Error loading remote image', placeholderConfig);
    }
  }

  try {
    // Process local image
    const images = import.meta.glob<{ default: ImageMetadata }>(
      '/src/images/**/*.{jpeg,jpg,png,gif,webp,svg,avif}',
      { eager: true }
    );
    
    const importedImage = images[src]?.default;
    if (!importedImage) {
      console.error('Local image not found:', src);
      return createFallbackImage('Local image not found', placeholderConfig);
    }

    return {
      src: importedImage,
      width: importedImage.width,
      height: importedImage.height,
      format: detectImageFormat(importedImage.src)
    };
  } catch (error) {
    console.error('Error processing local image:', error);
    return createFallbackImage('Error processing image', placeholderConfig);
  }
}

function createFallbackImage(errorText: string, config?: PlaceholderConfig): ProcessedImage {
  const placeholderUrl = createPlaceholderUrl({
    width: config?.width || 1200,
    height: config?.height || 630,
    text: errorText,
    bgColor: config?.bgColor,
    textColor: config?.textColor
  });

  return {
    src: placeholderUrl,
    width: config?.width || 1200,
    height: config?.height || 630,
    format: 'png'
  };
}

export function getImageSrc(src: ImageMetadata | string): string {
  return isImageMetadata(src) ? src.src : src;
}

// Helper function to process multiple images
export async function processImages(
  sources: (string | undefined)[],
  config?: PlaceholderConfig
): Promise<ProcessedImage[]> {
  return Promise.all(sources.map(src => processImage(src, config)));
}

// Usage example:
/*
const processedImage = await processImage('/path/to/image.jpg', {
  width: 800,
  height: 400,
  text: 'Custom placeholder text',
  bgColor: 'ffffff',
  textColor: '000000'
});

// Get the actual src URL
const imageUrl = getImageSrc(processedImage.src);
*/