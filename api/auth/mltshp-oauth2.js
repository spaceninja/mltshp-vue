/**
 * Auth Module OAuth2 Scheme
 * This is a modified copy of @nuxtjs/auth/lib/schemes/oauth2.js
 *
 * MLTSHP's OAuth2 implimentation is different from what the Nuxt Auth module
 * expects. For example, MLTSHP does not return a state parameter with the
 * auth code. Also, when making API requests, rather than simply attaching the
 * token as a parameter, MLTSHP expects a signature made using the token.
 */
import {
  encodeQuery,
  parseQuery,
} from '~/node_modules/@nuxtjs/auth/lib/core/utilities';
const isHttps = process.server ? require('is-https') : null;

export default class Oauth2Scheme {
  constructor(auth, options) {
    this.$auth = auth;
    this.req = auth.ctx.req;
    this.name = options._name;
    this.options = options;
  }

  // determine the correct redirect url
  get _redirectURI() {
    const url = this.options.redirect_uri;

    if (url) {
      return url;
    }

    if (process.server && this.req) {
      const protocol = 'http' + (isHttps(this.req) ? 's' : '') + '://';

      return (
        protocol + this.req.headers.host + this.$auth.options.redirect.callback
      );
    }

    if (process.client) {
      return window.location.origin + this.$auth.options.redirect.callback;
    }
  }

  /**
   * Mounted
   *
   * - Synchronize the token to ensure it's properly loaded
   * - Set the token for Axios use (?)
   * - Trigger the callback method
   * - Trigger the fetchUser method if not a reload(?)
   */
  async mounted() {
    console.group('[OAUTH2] MOUNTED');

    // Sync token
    const token = this.$auth.syncToken(this.name);
    console.log('[OAUTH2] SYNC TOKEN', token);

    // Set axios token
    if (token) {
      this._setToken(token.access_token);
    }

    // Handle callbacks on page load
    const redirected = await this._handleCallback();
    console.log('[OAUTH2] CALLBACK COMPLETE, REDIRECTED', redirected);

    if (!redirected) {
      console.log('[OAUTH2] NOT REDIRECT, FETCH USER');
      console.groupEnd();
      return this.$auth.fetchUserOnce();
    }
    console.groupEnd();
  }

  // TODO: this probably isn't useful, since we need to build the authstring each time
  _setToken(token) {
    // Set Authorization token for all axios requests
    this.$auth.ctx.app.$axios.setHeader('Authorization', token);
  }

  // TODO: this probably isn't usefule, since we need to build the authstring each time
  _clearToken() {
    // Clear Authorization token for all axios requests
    this.$auth.ctx.app.$axios.setHeader('Authorization', false);
  }

  /**
   * Log Out
   *
   * - clear the token
   * - reset auth state
   */
  logout() {
    console.log('[OAUTH2] LOGOUT');
    this._clearToken();
    return this.$auth.reset();
  }

  /**
   * Log In
   * Construct authorization endpoint URL with parameters, then go there.
   */
  login() {
    console.group('[OAUTH2] LOGIN');
    const opts = {
      response_type: 'code',
      client_id: this.options.client_id,
      redirect_uri: this._redirectURI,
    };
    const url = this.options.authorization_endpoint + '?' + encodeQuery(opts);

    console.table(opts);
    console.log('[OAUTH2] LOGIN URL', url);
    console.groupEnd();

    window.location = url;
  }

  /**
   * Fetch User
   *
   * TODO: document
   */
  async fetchUser() {
    console.group('[OAUTH2] FETCH USER');
    if (!this.$auth.getToken(this.name)) {
      console.warn('[OAUTH2] NO NAME');
      console.groupEnd();
      return;
    }

    if (!this.options.userinfo_endpoint) {
      console.warn('[OAUTH2] NO USERINFO ENDPOINT');
      console.groupEnd();
      this.$auth.setUser({});
      return;
    }

    console.log('[OAUTH2] FETCH USER API REQUEST GOES HERE');

    const user = await this.$auth.requestWith(this.name, {
      url: this.options.userinfo_endpoint,
    });
    console.log('[OAUTH2] USER', user);

    this.$auth.setUser(user);
    console.log('[OAUTH2] SET USER', user);

    console.groupEnd();
  }

  /**
   * Handle Callback
   *
   * - check if we're supposed to redirect (?)
   * - parse the URL query parameters for auth code
   * - request a token from the API using the auth code
   * - save the token
   * - set the token for axios use (?)
   * - redirect to home
   */
  async _handleCallback(uri) {
    console.group('[OAUTH2] HANDLE CALLBACK');

    // Handle callback only for specified route
    if (
      this.$auth.options.redirect &&
      this.$auth.ctx.route.path !== this.$auth.options.redirect.callback
    ) {
      console.warn('[OAUTH2] WRONG ROUTE');
      console.groupEnd();
      return;
    }

    // Callback flow is not supported in server side
    if (process.server) {
      return;
    }

    const hash = parseQuery(this.$auth.ctx.route.hash.substr(1));
    const parsedQuery = Object.assign({}, this.$auth.ctx.route.query, hash);
    let token = parsedQuery[this.options.token_key || 'access_token'];
    console.log('[OAUTH2] PARSE QUERY', parsedQuery, token);

    // -- Authorization Code Grant --
    // client secret will be appended by the proxy server, see add-authorize.js
    if (parsedQuery.code) {
      console.group('[OAUTH2] AUTH CODE GRANT');
      console.log('[OAUTH2] REQUEST', this.options.access_token_endpoint);
      const data = await this.$auth.request({
        method: 'post',
        url: this.options.access_token_endpoint,
        baseURL: process.server ? undefined : false,
        data: encodeQuery({
          code: parsedQuery.code,
          client_id: this.options.client_id,
          redirect_uri: this._redirectURI,
          grant_type: 'authorization_code',
        }),
      });
      console.table(data);

      if (data.access_token) {
        // token = data.access_token;
        token = data; // save the entire token object
      }

      console.log('[OAUTH2] TOKEN', token);
      console.groupEnd();
    }

    if (!token || !token.access_token || !token.access_token.length) {
      console.error('[OAUTH2] NO TOKEN!');
      console.groupEnd();
      return;
    }

    // Store token
    this.$auth.setToken(this.name, token);
    console.log('[OAUTH2] SET TOKEN', this.name, token);

    // Set axios token
    this._setToken(token.access_token);

    console.groupEnd();

    // Redirect to home
    this.$auth.redirect('home', true);

    return true; // True means a redirect happened
  }
}
