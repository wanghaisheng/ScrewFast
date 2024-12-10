import type { SupportedLanguage } from './base';

/**
 * Get user's preferred language from various sources
 */
export function getUserLanguagePreference(
  request: Request, 
  supportedLanguages: readonly string[],
  defaultLang: string
): string {
  // 1. Check URL query parameter
  const url = new URL(request.url);
  const queryLang = url.searchParams.get('lang');
  if (queryLang && supportedLanguages.includes(queryLang)) {
    return queryLang;
  }

  // 2. Check cookie
  const cookieHeader = request.headers.get('cookie');
  if (cookieHeader) {
    const cookies = Object.fromEntries(
      cookieHeader.split(';').map(cookie => {
        const [key, value] = cookie.trim().split('=');
        return [key, value];
      })
    );
    const langCookie = cookies['preferred-language'];
    if (langCookie && supportedLanguages.includes(langCookie)) {
      return langCookie;
    }
  }

  // 3. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLanguages = acceptLanguage
      .split(',')
      .map(lang => {
        const [language, priority = '1.0'] = lang.trim().split(';q=');
        return {
          language: language.split('-')[0], // Get primary language tag
          priority: parseFloat(priority)
        };
      })
      .sort((a, b) => b.priority - a.priority);

    // Find first supported language
    const matchedLang = preferredLanguages.find(
      ({ language }) => supportedLanguages.includes(language)
    );
    
    if (matchedLang) {
      return matchedLang.language;
    }
  }

  // 4. Fallback to default language
  return defaultLang;
}

/**
 * Set user's language preference
 */
export function setLanguagePreference(lang: string) {
  document.cookie = `preferred-language=${lang};path=/;max-age=31536000`; // 1 year
}

/**
 * Check if language is supported
 */
export function isLanguageSupported(
  lang: string, 
  supportedLanguages: readonly string[]
): lang is SupportedLanguage {
  return supportedLanguages.includes(lang);
}