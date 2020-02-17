// import { getFromApi } from '~/services/mltshp';
import Shake from '@/models/Shake';

export const mutations = {
  ADD_SHAKE(state, shake) {
    console.log('ADD SHAKE TO STORE', shake);
    Shake.insertOrUpdate({ data: shake });
  },
};

export const actions = {
  fetchShake({ commit }, id) {
    console.group('[SHAKE STORE] FETCH', id);
    commit('START_LOADING', null, { root: true });

    // see if the shake is already in the store
    const foundShake = Shake.find(id);

    // TODO: remove cache check
    if (foundShake) {
      console.log('SHAKE ALREADY IN STATE!');
      commit('FINISH_LOADING', null, { root: true }); // in memory already
    } else {
      console.warn('SHAKE NOT FOUND IN STATE');
      // TODO: load shake from new API endpoint

      // see if the shake is in the auth user object
      const foundAuthShake = this.$auth.user.shakes.find(
        shake => shake.id === Number(id)
      );

      if (foundAuthShake) {
        console.log('SHAKE ALREADY IN AUTH STATE!');

        // add the auth user ID before saving
        foundAuthShake.user_id = this.$auth.user.id;

        // Store the shake object
        commit('ADD_SHAKE', foundAuthShake);
        commit('FINISH_LOADING', null, { root: true });
      } else {
        console.error('SHAKE NOT FOUND IN AUTH STATE');
        // nothing we can do until there's an API method to load shakes
        commit('FINISH_LOADING', null, { root: true });
      }
    }
    console.groupEnd();
  },
};
