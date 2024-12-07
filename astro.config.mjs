import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import starlight from "@astrojs/starlight";
import { astroImageTools } from "astro-imagetools";
import AstroPWA from '@vite-pwa/astro'

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      charset: 'utf8',
    },
  },
  // https://docs.astro.build/en/guides/images/#authorizing-remote-images
  site: "https://astroproduct.borninsea.com",
  image: {
    domains: ["images.unsplash.com"],
  },
  // i18n: {
  //   defaultLocale: "en",
  //   locales: ["en", "fr"],
  //   fallback: {
  //     fr: "en",
  //   },
  //   routing: {
  //     prefixDefaultLocale: false,
  //   },
  // },
  prefetch: true,
  integrations: [

    AstroPWA({
      manifest: {
        base: "/",
        scope: "/",
        orientation: "portrait-primary",
        name: "The Simple Bible",
        short_name: "Bible",
        description: "A well designed simple Bible app powered by Astro.",
        categories: ["books", "education", "religious"],
        screenshots: [
          {
            src: "home-dark.PNG",
            sizes: "1179x2556",
            type: "image/png",
            platform: "narrow",
            label: "Homescreen in dark mode",
          },
          {
            src: "home-light.PNG",
            sizes: "1179x2556",
            type: "image/png",
            platform: "narrow",
            label: "Homescreen in light mode",
          },
          {
            src: "verse-dark.PNG",
            sizes: "1179x2556",
            type: "image/png",
            platform: "narrow",
            label: "Genesis 1:2 in dark mode",
          },
          {
            src: "verse-light.PNG",
            sizes: "1179x2556",
            type: "image/png",
            platform: "narrow",
            label: "Genesis 1:2 in light mode",
          },
        ],
        start_url: "https://bible.stefenphelps.com",
        theme_color: "#fff7ed",
        background_color: "#fff7ed",
        display: "standalone",
        includeAssets: ["*.{png,ico,svg,jpg,xml}"],
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/safari-pinned-tab.svg",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
      pwaAssets:{
        config: true,
      },

      workbox: {
        navigateFallback: "/404",
        globPatterns: ["**/*.{css,js,html,svg,png,ico,txt}"],
      },
    }),

    astroImageTools,
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: "en", // All urls that don't contain `fr` after `https://astroproduct.borninsea.com/` will be treated as default locale, i.e. `en`
        locales: {
          en: "en", // The `defaultLocale` value must present in `locales` keys
          fr: "fr",
        },
      },
    }),
    starlight({
      title: "AstroProductFast Docs",
      defaultLocale: "root",
      // https://github.com/withastro/starlight/blob/main/packages/starlight/CHANGELOG.md
      // If no Astro and Starlight i18n configurations are provided, the built-in default locale is used in Starlight and a matching Astro i18n configuration is generated/used.
      // If only a Starlight i18n configuration is provided, an equivalent Astro i18n configuration is generated/used.
      // If only an Astro i18n configuration is provided, the Starlight i18n configuration is updated to match it.
      // If both an Astro and Starlight i18n configurations are provided, an error is thrown.
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
        de: { label: "Deutsch", lang: "de" },
        es: { label: "Español", lang: "es" },
        fa: { label: "Persian", lang: "fa", dir: "rtl" },
        fr: { label: "Français", lang: "fr" },
        ja: { label: "日本語", lang: "ja" },
        "zh-cn": { label: "简体中文", lang: "zh-CN" },
      },
      // https://starlight.astro.build/guides/sidebar/
      sidebar: [
        {
          label: "Quick Start Guides",
          translations: {
            de: "Schnellstartanleitungen",
            es: "Guías de Inicio Rápido",
            fa: "راهنمای شروع سریع",
            fr: "Guides de Démarrage Rapide",
            ja: "クイックスタートガイド",
            "zh-cn": "快速入门指南",
          },
          autogenerate: { directory: "guides" },
        },
        {
          label: "Tools & Equipment",
          items: [
            { label: "Tool Guides", link: "tools/tool-guides/" },
            { label: "Equipment Care", link: "tools/equipment-care/" },
          ],
        },
        {
          label: "Construction Services",
          autogenerate: { directory: "construction" },
        },
        {
          label: "Advanced Topics",
          autogenerate: { directory: "advanced" },
        },
      ],
      social: {
        github: "https://github.com/mearashadowfax/AstroProductFast",
      },
      disable404Route: true,
      customCss: ["./src/assets/styles/starlight.css"],
      favicon: "/favicon.ico",
      components: {
        SiteTitle: "./src/components/ui/starlight/SiteTitle.astro",
        Head: "./src/components/ui/starlight/Head.astro",
        MobileMenuFooter: "./src/components/ui/starlight/MobileMenuFooter.astro",
        ThemeSelect: "./src/components/ui/starlight/ThemeSelect.astro",
      },
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "https://astroproduct.borninsea.com" + "/social.webp",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "twitter:image",
            content: "https://astroproduct.borninsea.com" + "/social.webp",
          },
        },
      ],
    }),
    compressor({
      gzip: false,
      brotli: true,
    }),
  ],
  experimental: {
    clientPrerender: true,
    directRenderScript: true,
  },
});
