require('dotenv').config();
const addAuthorize = require('./services/add-authorize-proxy');

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: titleChunk => {
      // If undefined or blank then we don't need the hyphen
      return titleChunk ? `${titleChunk} - MLTSHP in Vue` : 'MLTSHP in Vue';
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Easily save images from everywhere on the web. ' +
          'The silly ones, the sweet ones. The cool ones. The gross ones. ' +
          'Then share them with your friends and family.',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href:
          process.env.NODE_ENV === 'production'
            ? '/favicon.ico'
            : '/favicon-dev.ico',
      },
    ],
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
    middleware: ['auth'],
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/vue-async-computed'],

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
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/markdownit
    '@nuxtjs/markdownit',
  ],

  /*
   ** Markdown module configuration
   */
  markdownit: {
    injected: true,
    linkify: true,
  },

  /*
   ** Axios module configuration
   */
  axios: {
    debug: true,
    proxy: true,
  },

  /*
   ** Proxy module configuration
   */
  proxy: {
    '/api': 'https://mltshp.com',
    '/oembed': 'https://www.youtube.com',
    '/services': 'https://www.flickr.com',
  },

  /*
   ** Auth module configuration
   */
  auth: {
    plugins: ['~/plugins/auth-error', '~/plugins/auth-redirect'],
    redirect: {
      login: '/',
      callback: '/callback',
    },
    strategies: {
      local: false,
      mltshp: {
        _scheme: '~/services/mltshp-oauth2.js',
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
