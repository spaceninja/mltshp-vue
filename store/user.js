import generateAuthString from '~/mltshp-api/generate-auth-string';
const url = require('url');

// TODO: change user object to users array
export const state = () => ({
  user: {},
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};

export const actions = {
  async getUser({ commit }, slug) {
    // TODO: move to separate file
    console.group('[CREATED] FETCH USER');

    let userInfoEndpoint = `https://mltshp.com/api/user_name/${slug}`;
    console.log('USER INFO ENDPOINT', userInfoEndpoint);
    // eslint-disable-next-line node/no-deprecated-api
    const userInfoPathname = url.parse(userInfoEndpoint).pathname;

    // Remove domain from the client-side endpoint, and use the proxy instead
    if (process.client) {
      userInfoEndpoint = `/api${userInfoPathname.slice(4)}`;
    }
    console.log(
      '[CREATED] USERINFO ENDPOINT',
      userInfoPathname,
      userInfoEndpoint
    );

    // Construct signature for API request
    const authString = generateAuthString(
      this.$auth.getToken(this.$auth.$state.strategy),
      userInfoPathname
    );
    console.log('[CREATED] AUTH STRING', authString);

    // Request user info from the API
    const user = await this.$auth.requestWith(this.$auth.$state.strategy, {
      url: userInfoEndpoint,
      headers: {
        Authorization: authString,
      },
    });

    if (!user) {
      console.error('[CREATED] NO USER!');
      console.groupEnd();
      return;
    }

    // Store the user object
    commit('setUser', user);

    console.log('[CREATED] USER', user);
    console.groupEnd();
  },
};
