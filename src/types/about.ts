export interface AboutMainSection {
  title: string;
  subTitle: string;
  description: string;
  stats: {
    number: string;
    label: string;
  }[];
  backgroundImage: string;
  backgroundImageMobile: string;
}

export interface AboutPageData {
  mainSection: AboutMainSection;
  // ... other sections
}