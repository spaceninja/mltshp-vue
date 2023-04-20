// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@sidebase/nuxt-auth'],
  auth: {
    origin: process.env.ORIGIN,
    enableGlobalAppMiddleware: true,
  },
  css: ['mltshp-patterns', '@/assets/styles/main.scss'],
  routeRules: {
    // Add cors headers
    '/api/auth/**': { cors: true },
  },
});
