import { makeApiRequest } from '~/services/mltshp';
import User from '@/models/User';
const camelcaseKeys = require('camelcase-keys');

export const state = () => ({
  loading: false,
  error: null,
});

export const mutations = {
  START_LOADING: state => (state.loading = true),
  FINISH_LOADING: state => (state.loading = false),
  SET_ERROR: (state, error) => (state.error = error),
  CLEAR_ERROR: state => (state.error = null),
  ADD_USER(state, user) {
    console.log('[USER STORE] ADD', user);
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
    console.log('[USER STORE] FETCH USER', slug);
    commit('CLEAR_ERROR');
    commit('START_LOADING');

    // request the user from the API
    const response = await makeApiRequest(
      this.$auth.getToken(this.$auth.$state.strategy),
      `https://mltshp.com/api/user_name/${slug}`
    );

    // handle errors
    if (response.error) {
      console.error('[USER STORE] ERROR', response.error);
      commit('SET_ERROR', response.error);
      commit('FINISH_LOADING');
      throw response.error;
    }

    // change keys to camelCase to match Vue prop naming convention
    const user = camelcaseKeys(response, { deep: true });

    // store the user object
    commit('ADD_USER', user);
    commit('FINISH_LOADING');
    return user;
  },
};
