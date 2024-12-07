export interface Highlight {
  icon?: string;
  text: string;
}

export interface CTAButton {
  title: string;
  link: string;
  type: 'primary' | 'secondary';
}

export interface HeroProps {
  title: string;
  slogan: string;
  description?: string;
  highlights?: Highlight[];
  ctas?: CTAButton[];
  media: {
    type: 'video' | 'image';
    src: string;
    mobileSrc?: string;
    poster?: string;
  };
}