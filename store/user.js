import { getFromApi } from '~/services/mltshp';
import User from '@/models/User';

export const state = () => ({
  loading: false,
});

export const mutations = {
  START_LOADING: state => (state.loading = true),
  FINISH_LOADING: state => (state.loading = false),
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
    commit('START_LOADING');

    // load the token
    const token = this.$auth.getToken(this.$auth.$state.strategy);
    console.log('TOKEN', token);

    // request the user from the API
    const user = await getFromApi(
      token,
      `https://mltshp.com/api/user_name/${slug}`
    );
    console.log('API RESULT', user);

    // handle errors
    if (user.error) {
      console.error('ERROR', user.error.message);
      console.groupEnd();
      commit('FINISH_LOADING');
      return;
    }

    // Store the user object
    commit('ADD_USER', user);
    commit('FINISH_LOADING');
    console.groupEnd();
  },
};
