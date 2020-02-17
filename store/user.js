import { getFromApi } from '~/services/mltshp';
import User from '@/models/User';

export const mutations = {
  ADD_USER(state, user) {
    console.log('ADD USER TO STORE', user);
    User.insertOrUpdate({ data: user });
  },
};

export const actions = {
  async fetchUser({ commit }, slug) {
    console.group('[USER STORE] FETCH', slug);
    commit('START_LOADING', null, { root: true });

    // see if the user is already in the store
    const foundUser = User.query()
      .where('name', slug)
      .first();

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
