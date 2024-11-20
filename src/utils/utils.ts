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