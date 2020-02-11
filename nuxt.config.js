require('dotenv').config()
const { assignDefaults, addAuthorize } = require('./services/auth-utils')

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
    // Doc: https://axios.nuxtjs.org/
    '@nuxtjs/axios',
    // Doc: https://auth.nuxtjs.org
    '@nuxtjs/auth'
  ],
  /*
   ** Auth module configuration
   */
  auth: {
    plugins: ['~/plugins/auth-error', '~/plugins/auth-redirect'],
    redirect: {
      callback: '/callback'
    },
    strategies: {
      local: false,
      mltshp: {
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        _provider(strategy) {
          assignDefaults(strategy, {
            _scheme: '~/services/oauth2.js',
            access_type: 'offline',
            authorization_endpoint: 'https://mltshp.com/api/authorize',
            grant_type: 'authorization_code',
            response_type: 'code',
            scope: '*',
            token_endpoint: 'https://mltshp.com/api/token',
            userinfo_endpoint: false
          })
          addAuthorize.call(this, strategy)
        }
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
