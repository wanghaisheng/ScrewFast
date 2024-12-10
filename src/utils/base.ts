import type { CollectionEntry } from "astro:content";
import siteconfig from "@data/site.json" assert { type: "json" };

// Types derived from site config
export type SupportedLanguage = typeof siteconfig.supportedLanguages[number];
export type LanguageLabels = Record<SupportedLanguage, string>;

// Main site config interface
export interface SiteConfig {
  SITE: {
    title: string;
    tagline: string;
    description: string;
    description_short: string;
    url: string;
    author: string;
  };
  menuType: 'navbar' | 'mega' | 'vertical';
  supportedLangLabels: LanguageLabels;
  defaultlang: SupportedLanguage;
  supportedLanguages: readonly SupportedLanguage[];
}

// Type for translations
type TranslationDict = Record<string, any>;

// Language utility functions
export function getLanguageUtils(config: SiteConfig) {
  return {
    getSupportedLanguages: () => config.supportedLanguages,
    getLanguageLabel: (lang: SupportedLanguage) => config.supportedLangLabels[lang],
    isLanguageSupported: (lang: string): lang is SupportedLanguage => 
      config.supportedLanguages.includes(lang as SupportedLanguage),
    getDefaultLanguage: () => config.defaultlang,
  };
}

export function getLangFromUrl(url: URL): SupportedLanguage {
  const [, lang] = url.pathname.split('/');
  if (lang && isLanguageSupported(lang)) {
    return lang;
  }
  return siteconfig.defaultlang;
}

export function useTranslations(lang: SupportedLanguage) {
  return async function t(key: string) {
    const translations = await getTranslations();
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
      if (value === undefined) break;
      value = value[k];
    }
    return value || key;
  }
}

export function isLanguageSupported(lang: string): lang is SupportedLanguage {
  return siteconfig.supportedLanguages.includes(lang as SupportedLanguage);
}

export function getLocalizedPath(path: string, currentLang: SupportedLanguage): string {
  const cleanPath = path.replace(/^\/[a-z]{2}\//, '').replace(/^\/+|\/+$/g, '');
  if (currentLang && currentLang !== siteconfig.defaultlang) {
    return `/${currentLang}/${cleanPath}/`;
  }
  return `/${cleanPath}/`;
}

export function getLanguageUrl(
  currentPath: string, 
  lang: SupportedLanguage, 
  slug?: string
): string {
  const pathParts = currentPath.split('/').filter(Boolean);
  if (isLanguageSupported(pathParts[0])) {
    pathParts[0] = lang;
  } else {
    pathParts.unshift(lang);
  }
  
  if (slug) {
    if (pathParts.includes('products')) {
      const productIndex = pathParts.indexOf('products');
      pathParts[productIndex + 1] = slug;
    } else {
      pathParts.push('products', slug);
    }
  }
  return '/' + pathParts.join('/') + '/';
}

// Translation loading and caching
let translationsCache: Record<SupportedLanguage, TranslationDict> | null = null;

async function loadTranslations() {
  const translations: Record<SupportedLanguage, TranslationDict> = {} as Record<SupportedLanguage, TranslationDict>;
  
  for (const lang of siteconfig.supportedLanguages) {
    try {
      const translation = await import(`../translations/${lang}.json`);
      translations[lang] = translation.default;
    } catch (error) {
      console.warn(`Warning: Translation file for ${lang} not found`);
      if (lang !== siteconfig.defaultlang) {
        const defaultTranslation = await import(`../translations/${siteconfig.defaultlang}.json`);
        translations[lang] = defaultTranslation.default;
      }
    }
  }
  return translations;
}

export async function getTranslations() {
  if (!translationsCache) {
    translationsCache = await loadTranslations();
  }
  return translationsCache;
}

export async function getI18n(lang: SupportedLanguage = siteconfig.defaultlang) {
  const translations = await getTranslations();
  return translations[lang] || translations[siteconfig.defaultlang];
}


export function getSlugWithoutLang(slug: string, lang: SupportedLanguage) {
  return slug.replace(`${lang}/`, '');
}

export function getFullSlug(slug: string, lang: SupportedLanguage) {
  return `${lang}/${slug}`;
}

// Helper function to get translation with fallback
export async function t(key: string, lang: SupportedLanguage = siteconfig.defaultlang) {
  const translations = await getTranslations();
  const translation = translations[lang];
  if (!translation) {
    return key;
  }

  const keys = key.split('.');
  let value = translation;
  for (const k of keys) {
    if (value === undefined) break;
    value = value[k];
  }

  // Fallback to default language if translation is missing
  if (value === undefined && lang !== siteconfig.defaultlang) {
    const defaultTranslation = translations[siteconfig.defaultlang];
    value = defaultTranslation;
    for (const k of keys) {
      if (value === undefined) break;
      value = value[k];
    }
  }

  return value || key;
}

// Export constants
export const defaultLang = siteconfig.defaultlang;
export const supportedLanguages = siteconfig.supportedLanguages;
export const languageLabels = siteconfig.supportedLangLabels;