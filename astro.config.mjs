// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lishkee.com',
  base: '/',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'cs'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        // Ignore a benign Rollup warning about unused external imports from
        // `@astrojs/internal-helpers/remote` that can appear during the Vite
        // build step. This import is re-exported by Astro and the warning is
        // harmless for our site; filtering it keeps the build output cleaner.
        onwarn(warning, warn) {
          if (
            warning &&
            warning.code === "UNUSED_EXTERNAL_IMPORT" &&
            typeof warning.message === "string" &&
            /@astrojs\/internal-helpers\/remote/.test(warning.message)
          ) {
            return
          }
          warn(warning)
        }
      }
    }
  }
});
