import { getFromApi } from '~/services/mltshp';
import User from '@/models/User';

export const mutations = {
  ADD_USER(state, user) {
    console.log('ADD USER TO STORE', user);
    User.insertOrUpdate({ data: user });
  },
};

export const actions = {
  /**
   * Fetch a single User from the API
   *
   * @param {object} context
   * @param {string} slug - the user's slug
   */
  async fetchUser({ commit }, slug) {
    console.group('[USER STORE] FETCH', slug);
    commit('START_LOADING', null, { root: true });

    // see if the user is already in the store
    // TODO: small bug here: If an incomplete user was injected (eg, from the
    // shake, where it only has a single shake link), then it won't ever try to
    // load more, because it doesn't know anything's missing.
    // to reproduce, visit a user shake, reload the page, then visit the user.
    // their other shakes will be missing.
    // potential solution - add "loaded from source" flag that is only set if
    // called from the detail page?
    const foundUser = User.query()
      .where('name', slug)
      .first();

    // TODO: remove cache check
    if (foundUser) {
      console.log('USER ALREADY IN STATE!');
      commit('FINISH_LOADING', null, { root: true }); // in memory already
    } else {
      console.warn('USER NOT FOUND IN STATE');

      // load the token
      const token = this.$auth.getToken(this.$auth.$state.strategy);
      console.log('TOKEN', token);

      // request the user from the API
      const user = await getFromApi(
        token,
        `https://mltshp.com/api/user_name/${slug}`
      );

      // handle errors
      if (user.error) {
        console.error('ERROR', user.error.message);
        console.groupEnd();
        commit('FINISH_LOADING', null, { root: true });
        return;
      }

      // Store the user object
      console.log('API RESULT', user);
      commit('ADD_USER', user);
      commit('FINISH_LOADING', null, { root: true });
    }
    console.groupEnd();
  },
};
