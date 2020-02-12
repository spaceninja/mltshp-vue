require('dotenv').config();
const addAuthorize = require('./api/mltshp/auth/add-authorize');

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'MLTSHP in Vue',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#f00' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Router Config
   */
  router: {
    linkExactActiveClass: 'is-active',
  },

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
    '@nuxtjs/stylelint-module',
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
    '@nuxtjs/auth',
    // Doc: https://github.com/nuxt-community/proxy-module
    '@nuxtjs/proxy',
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    proxy: true,
  },

  /*
   ** Proxy module configuration
   */
  proxy: {
    '/api': 'https://mltshp.com',
  },

  /*
   ** Auth module configuration
   */
  auth: {
    plugins: ['~/plugins/auth-error', '~/plugins/auth-redirect'],
    redirect: {
      callback: '/callback',
    },
    strategies: {
      local: false,
      mltshp: {
        _scheme: '~/api/mltshp/auth/mltshp-oauth2.js',
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        authorization_endpoint: 'https://mltshp.com/api/authorize',
        token_endpoint: 'https://mltshp.com/api/token',
        userinfo_endpoint: 'https://mltshp.com/api/user',
        _provider(strategy) {
          addAuthorize.call(this, strategy);
        },
      },
    },
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
};
