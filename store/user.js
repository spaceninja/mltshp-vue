import { getFromApi } from '~/services/mltshp';
import User from '@/models/User';

export const mutations = {
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

    // load the token from auth state
    const token = this.$auth.getToken(this.$auth.$state.strategy);

    // request the user from the API
    const response = await getFromApi(
      token,
      `https://mltshp.com/api/user_name/${slug}`
    );

    // handle errors
    if (response.error) {
      console.error('[USER STORE] ERROR', response.error.message);
      throw response.error;
    }

    // store the user object
    commit('ADD_USER', response);
  },
};
