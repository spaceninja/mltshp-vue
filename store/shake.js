// import { getFromApi } from '~/services/mltshp';
import Shake from '@/models/Shake';

export const mutations = {
  ADD_SHAKE(state, shake) {
    console.log('[SHAKE STORE] ADD SHAKE', shake);
    // User.insert({ data: user });
  },
};

export const actions = {
  fetchShake({ commit }, id) {
    console.group('[SHAKE STORE] FETCH', id);
    // const foundUser = this.getters['user/getUserBySlug'](slug);

    // if (foundUser) {
    //   console.warn('USER ALREADY IN MEMORY!');
    //   commit('FINISH_LOADING', null, { root: true }); // in memory already
    // } else {
    //   console.log('USER NOT FOUND');
    //   commit('START_LOADING', null, { root: true });

    //   const token = this.$auth.getToken(this.$auth.$state.strategy);
    //   console.log('[SHAKE STORE] TOKEN', token);

    //   const user = await getFromApi(
    //     token,
    //     `https://mltshp.com/api/user_name/${slug}`
    //   );
    //   console.log('[SHAKE STORE] USER', user);

    //   // Store the user object
    //   commit('ADD_SHAKE', user);
    //   commit('FINISH_LOADING', null, { root: true });
    // }
    console.groupEnd();
  },
};

export const getters = {
  getShakeById: state => id => {
    console.log('[SHAKE STORE] GET SHAKE BY ID', id);
    return Shake.find(id);
  },
};
