// import { getFromApi } from '~/services/mltshp';
import Shake from '@/models/Shake';

export const mutations = {
  ADD_SHAKE(state, shake) {
    console.log('[SHAKE STORE] ADD SHAKE', shake);
    Shake.insert({ data: shake });
  },
};

export const actions = {
  fetchShake({ commit }, id) {
    commit('START_LOADING', null, { root: true });
    console.group('[SHAKE STORE] FETCH', id);
    const foundShake = this.getters['shake/getShakeById'](id);

    if (foundShake) {
      console.warn('SHAKE ALREADY IN STATE!');
      commit('FINISH_LOADING', null, { root: true }); // in memory already
    } else {
      console.log('SHAKE NOT FOUND IN STATE');
      commit('START_LOADING', null, { root: true });

      const foundStateShake = this.$auth.user.shakes.find(
        shake => shake.id === Number(id)
      );

      if (foundStateShake) {
        console.log('FOUND SHAKE IN AUTH STATE');
        foundStateShake.user_id = this.$auth.user.id;
        // foundStateShake.user = this.$auth.user;
        // Store the user object
        // TODO: this is not ideal because the shake ends up without a user object
        commit('ADD_SHAKE', foundStateShake);
      } else {
        console.error('SHAKE NOT FOUND IN AUTH STATE');
      }
      commit('FINISH_LOADING', null, { root: true });
    }
    console.groupEnd();
  },
};

export const getters = {
  getShakeById: state => id => {
    console.log('[SHAKE STORE] GET SHAKE BY ID', id);
    const shake = Shake.query()
      .withAll()
      .whereId(Number(id))
      .first();
    console.log('SHAKE', shake);
    return shake;
  },
};
