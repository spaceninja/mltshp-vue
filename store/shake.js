import { getFromApi } from '~/services/mltshp';
import Shake from '@/models/Shake';

const magicShakes = {
  likes: {
    id: 'favorites',
    url: '/likes',
    name: 'Your Favorites',
    description: 'A list of the most recent posts you liked.',
    type: 'magic',
  },
  friends: {
    id: 'friends',
    url: '/friends',
    name: 'Friends',
    description: 'A list of the most recent posts by users you follow.',
    type: 'magic',
  },
  popular: {
    id: 'magicfiles',
    url: '/popular',
    name: 'Popular',
    description: 'A list of the most recent posts with 10 or more likes.',
    type: 'magic',
  },
  incoming: {
    id: 'incoming',
    url: '/incoming',
    name: 'Incoming!',
    description: 'A list of the most recent posts.',
    type: 'magic',
  },
};

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
   * @param {object} options
   * @param {string} options.endpoint - the API endpoint to fetch shake info from
   * @param {number} options.shakeName - the name of the shake
   */
  async fetchShake({ commit }, options) {
    console.log('[SHAKE STORE] FETCH SHAKE', options);

    if (Object.prototype.hasOwnProperty.call(magicShakes, options.shakeName)) {
      console.log('SHAKE IS MAGIC!!!');
      commit('ADD_SHAKE', magicShakes[options.shakeName]);
      return;
    }

    // load the token from auth state
    const token = this.$auth.getToken(this.$auth.$state.strategy);

    // request the shake from the API
    const response = await getFromApi(
      token,
      `https://mltshp.com${options.endpoint}`
    );

    // handle errors
    if (response.error) {
      console.error('[SHAKE STORE] ERROR', response.error.message);
      throw response.error;
    }

    // store the shake object
    commit('ADD_SHAKE', response);
  },
};
