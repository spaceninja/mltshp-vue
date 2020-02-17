// import { getFromApi } from '~/services/mltshp';
import Shake from '@/models/Shake';

export const state = () => ({
  loading: false,
});

export const mutations = {
  START_LOADING: state => (state.loading = true),
  FINISH_LOADING: state => (state.loading = false),
  ADD_SHAKE(state, shake) {
    console.log('ADD SHAKE TO STORE', shake);
    Shake.insertOrUpdate({ data: shake });
  },
};

export const actions = {
  /**
   * Fetch a single Shake from the API
   *
   * @param {object} context
   * @param {string} id - the shake's id
   */
  fetchShake({ commit }, id) {
    console.group('[SHAKE STORE] FETCH', id);
    commit('START_LOADING');

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
      commit('FINISH_LOADING');
    } else {
      console.error('SHAKE NOT FOUND IN AUTH STATE');
      // nothing we can do until there's an API method to load shakes
      commit('FINISH_LOADING');
    }
    console.groupEnd();
  },
};
