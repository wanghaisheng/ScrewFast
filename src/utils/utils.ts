import type { ImageMetadata } from 'astro';

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

  export function getImageFromFolder(imagefolder:string,path: string): ImageMetadata {
    // imagefolder  /src/images
// Image handling
const images = import.meta.glob<{ default: ImageMetadata }>(`/src/images/**/*.{jpeg,jpg,png,gif,webp,svg,avif}`, {
  eager: true
});
const hasPrefix = path.startsWith(`${imagefolder}`);
let fullPath =path

if(!hasPrefix){
  fullPath = `/src/images${path}`;

}

  const image = images[fullPath];
  
  if (!image) {
    // throw new Error(`Image not found: ${path}---fullpath:${fullPath}`);
  }
  
  return image.default;
}


export function formatNumber(num: number): string {
  return num.toLocaleString();
}