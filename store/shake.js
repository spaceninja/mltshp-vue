import { getFromApi } from '~/services/mltshp';
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
   * @param {string} endpoint - the API endpoint to fetch shake info from
   */
  async fetchShake({ commit }, endpoint) {
    console.group('[SHAKE STORE] FETCH', endpoint);
    commit('START_LOADING');

    // load the token
    const token = this.$auth.getToken(this.$auth.$state.strategy);
    console.log('TOKEN', token);

    // request the user from the API
    const shake = await getFromApi(token, `https://mltshp.com${endpoint}`);
    console.log('API RESULT', shake);

    // handle errors
    if (shake.error) {
      console.error('ERROR', shake.error.message);
      console.groupEnd();
      commit('FINISH_LOADING');
      throw shake.error;
    }

    // Store the shake object
    commit('ADD_SHAKE', shake);
    commit('FINISH_LOADING');
    console.groupEnd();
  },
};
