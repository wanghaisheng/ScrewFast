import type { ImageMetadata } from 'astro';
import sizeOf from 'image-size';

export function getLocalImageSize(src:string) {
  const computedSrc = src.replace('/src', './src');
  console.log('--replace file path to--',src,computedSrc)

  const dimensions = sizeOf(computedSrc);
  console.log('----',dimensions)
  if (!dimensions || !dimensions.width || !dimensions.height) {
    throw new Error(`Failed to get dimensions for local image: ${computedSrc}`);
  }
  return {
    width: dimensions.width,
    height: dimensions.height,
  };
}
// Format the date to a string
function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric'};
  
    return new Date(date).toLocaleDateString(undefined, options);
  }
  // Capitalize the first letter
function capitalize(str:string): string {
  if ( typeof str !== 'string' || str.length === 0 ) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export { formatDate, capitalize };

export async function loadImage(imagePath: string) {
    try {
      const { default: img } = await import(
        imagePath.replace('@assets', '../assets')
      );
      return img;
    } catch (error) {
      console.error(`Error loading image: ${imagePath}`, error);
      return '/fallback-image.jpg'; // Make sure to have a fallback image
    }
  }

export function getImageFromFolder(imagefolder:string='/src/images',path: string=""): string {
    // imagefolder  /src/images
// Image handling
const images = import.meta.glob<{ default: ImageMetadata }>(`/src/images/**/*.{jpeg,jpg,png,gif,webp,svg,avif}`, {
  eager: true
});
const hasPrefix = path.startsWith(`${imagefolder}`);
const hasSlash=path.startsWith('/')
let fullPath =path
if(!path){
  throw new Error(`Failed to load local image for local image path: ${path}`);

}

if(!hasPrefix){
  if(hasSlash){
    fullPath = `/src/images${path}`;

  }
  fullPath = `/src/images/${path}`;

}

  const image = images[fullPath];
  console.log('convert image',image,path,fullPath)
  if (!image) {
    throw new Error(`Image not found: ${path}---fullpath:${fullPath}`);
  }
  
  return image.default.src;
}


export function formatNumber(num: number): string {
  return num.toLocaleString();
}