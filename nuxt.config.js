require('dotenv').config()

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://auth.nuxtjs.org
    '@nuxtjs/auth'
  ],
  /*
   ** Auth module configuration
   */
  auth: {
    redirect: {
      callback: '/callback'
    },
    strategies: {
      local: false,
      mltshp: {
        _scheme: 'oauth2',
        authorization_endpoint: 'https://mltshp.com/api/authorize',
        userinfo_endpoint: false,
        scope: ['openid', 'profile', 'email'],
        access_type: 'offline',
        access_token_endpoint: 'https://mltshp.com/api/token',
        response_type: 'code',
        token_type: 'Bearer',
        redirect_uri: undefined,
        client_id: process.env.OAUTH_CLIENT_ID,
        token_key: 'access_token',
        state: process.env.SECRET_KEY
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
