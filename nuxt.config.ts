// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@sidebase/nuxt-auth', '@pinia/nuxt', '@pinia-orm/nuxt'],
  auth: {
    origin: process.env.ORIGIN,
    enableGlobalAppMiddleware: true,
  },
});
