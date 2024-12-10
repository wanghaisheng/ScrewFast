import type { ImageMetadata } from 'astro';
import type { LanguageLabels } from "@/utils/base";

// Basic site metadata
export interface SiteMetadata {
  title: string;
  description: string;
  author: string;
  url: string;
}

// Open Graph metadata
export interface OGMetadata {
  title: string;
  description: string;
  image: ImageMetadata|string;
  locale?: string;
  type?: string;
  siteName?: string;
}

// Twitter metadata
export interface TwitterMetadata {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  domain?: string;
  title?: string;
  description?: string;
  image?: string;
}

// Favicon configuration
export interface FaviconConfig {
  svg: ImageMetadata;
  png: ImageMetadata;
  sizes?: {
    apple?: number;
    favicon?: number;
  };
}

// Language configuration
export interface LanguageConfig {
  code: string;
  prefix: string;
  label: string;
}

// Main meta props interface
export interface MetaProps {
  title?: string;
  meta?: string;
  structuredData?: any;
  og?: Partial<OGMetadata>;
  twitter?: Partial<TwitterMetadata>;
  canonical?: string;
  alternateLanguages?: LanguageConfig[];
  favicon?: FaviconConfig;
  themeColor?: string;
}