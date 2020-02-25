import { getFromApi } from '~/services/mltshp';
import Shake from '@/models/Shake';

export const mutations = {
  ADD_SHAKE(state, shake) {
    console.log('[SHAKE STORE] ADD', shake);
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
    console.log('[SHAKE STORE] FETCH SHAKE', endpoint);

    // load the token from auth state
    const token = this.$auth.getToken(this.$auth.$state.strategy);

    // request the shake from the API
    const response = await getFromApi(token, `https://mltshp.com${endpoint}`);

    // handle errors
    if (response.error) {
      console.error('[SHAKE STORE] ERROR', response.error.message);
      throw response.error;
    }

    // store the shake object
    commit('ADD_SHAKE', response);
  },
};
