require('dotenv').config()
const {
  assignDefaults,
  addAuthorize
} = require('@nuxtjs/auth/lib/providers/_utils')

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
        userinfo_endpoint: false,
        scope: ['openid', 'profile', 'email'],
        access_type: 'offline',
        response_type: 'code',
        token_type: 'Bearer',
        redirect_uri: undefined,
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        token_key: 'access_token',
        state: process.env.SECRET_KEY,
        _provider(strategy) {
          assignDefaults(strategy, {
            _scheme: '~/services/oauth2sv.js',
            authorization_endpoint: 'https://mltshp.com/api/authorize',
            access_token_endpoint: 'https://mltshp.com/api/token'
          })

          addAuthorize.call(this, strategy)
        }
      },
      github: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET
      },
      geethub: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        _provider(strategy) {
          assignDefaults(strategy, {
            _scheme: 'oauth2',
            authorization_endpoint: 'https://github.com/login/oauth/authorize',
            token_endpoint: 'https://github.com/login/oauth/access_token',
            userinfo_endpoint: 'https://api.github.com/user',

            scope: ['user', 'email']
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
