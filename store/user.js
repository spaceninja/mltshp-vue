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
    const foundUser = User.query()
      .where('name', slug)
      .first();

    if (foundUser) {
      console.warn('USER ALREADY IN STATE!');
      commit('FINISH_LOADING', null, { root: true }); // in memory already
    } else {
      console.warn('USER NOT FOUND IN STATE');
      commit('START_LOADING', null, { root: true });

      const token = this.$auth.getToken(this.$auth.$state.strategy);
      console.log('[USER STORE] TOKEN', token);

      const user = await getFromApi(
        token,
        `https://mltshp.com/api/user_name/${slug}`
      );

      if (user.error) {
        console.error('[USER STORE] ERROR', user.error.message);
        console.groupEnd();
        commit('FINISH_LOADING', null, { root: true });
        return;
      }

      console.log('[USER STORE] USER', user);

      // Store the user object
      commit('ADD_USER', user);
      commit('FINISH_LOADING', null, { root: true });
    }
    console.groupEnd();
  },
};
