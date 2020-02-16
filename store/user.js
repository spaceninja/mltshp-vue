import { getFromApi } from '~/services/mltshp';
import User from '@/models/User';

export const mutations = {
  ADD_USER(state, user) {
    console.log('[USER STORE] ADD USER', user);
    User.insert({ data: user });
  },
};

export const actions = {
  async fetchUser({ commit }, slug) {
    console.group('[USER STORE] FETCH', slug);
    const foundUser = this.getters['user/getUserBySlug'](slug);

    if (foundUser) {
      console.warn('USER ALREADY IN MEMORY!');
      commit('FINISH_LOADING', null, { root: true }); // in memory already
    } else {
      console.log('USER NOT FOUND');
      commit('START_LOADING', null, { root: true });

      const token = this.$auth.getToken(this.$auth.$state.strategy);
      console.log('[USER STORE] TOKEN', token);

      const user = await getFromApi(
        token,
        `https://mltshp.com/api/user_name/${slug}`
      );
      console.log('[USER STORE] USER', user);

      // Store the user object
      commit('ADD_USER', user);
      commit('FINISH_LOADING', null, { root: true });
    }
    console.groupEnd();
  },
};

export const getters = {
  getUserBySlug: state => slug => {
    console.log('[USER STORE] GET USER BY SLUG', slug);
    return User.query()
      .where('name', slug)
      .with('shakes')
      .first();
  },
};
