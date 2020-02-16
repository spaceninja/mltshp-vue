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
      console.warn('USER ALREADY IN STATE!');
      commit('FINISH_LOADING', null, { root: true }); // in memory already
    } else {
      console.warn('USER NOT FOUND IN STATE');
      // TODO: Check if user is in auth object before loading
      commit('START_LOADING', null, { root: true });
      const foundStateUser = this.$auth.user.name === slug;
      console.log('LOOKING', this.$auth.user.name, slug);

      if (foundStateUser) {
        console.log('FOUND USER IN AUTH STATE');
        // Store the user object
        commit('ADD_USER', this.$auth.user);
        commit('FINISH_LOADING', null, { root: true });
        return;
      } else {
        console.warn('USER NOT FOUND IN AUTH STATE');
      }

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

export const getters = {
  getUserBySlug: state => slug => {
    console.log('[USER STORE] GET USER BY SLUG', slug);
    return User.query()
      .where('name', slug)
      .with('shakes')
      .first();
  },
  getUserById: state => id => {
    console.log('[USER STORE] GET USER BY ID', id);
    return User.query()
      .whereId(id)
      .with('shakes');
  },
};
