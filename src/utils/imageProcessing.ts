export interface ProcessedImage {
  src: ImageMetadata | string;  // 可以是 ImageMetadata 或远程 URL
  width: number;
  height: number;
}

export function processImage(src: string | undefined): ProcessedImage | null {
  if (!src) return null;

  // 检查是否是远程 URL
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return {
      src: src,
      width: 1920, // 默认宽度
      height: 1080 // 默认高度
      // 注意：对于远程图片，我们可能无法获取实际尺寸
    };
  }

  try {
    // 处理本地图片
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
      height: importedImage.height
    };
  } catch (error) {
    console.error('Error processing image:', error);
    return null;
  }
}
