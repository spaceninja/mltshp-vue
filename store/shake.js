import { getFromApi } from '~/services/mltshp';
import Shake from '@/models/Shake';
const camelcaseKeys = require('camelcase-keys');

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
    thumbnailUrl:
      'https://mltshp-production.s3.amazonaws.com/account/2290/profile.jpg',
    type: 'magic',
  },
  incoming: {
    id: 'incoming',
    url: '/incoming',
    name: 'Incoming!',
    description: 'A list of the most recent posts.',
    thumbnailUrl: 'https://mltshp-cdn.com/static/images/incoming-header.svg',
    type: 'magic',
  },
};

export const state = () => ({
  loading: false,
});

export const mutations = {
  START_LOADING: state => (state.loading = true),
  FINISH_LOADING: state => (state.loading = false),
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
    commit('START_LOADING');

    if (Object.prototype.hasOwnProperty.call(magicShakes, options.shakeName)) {
      console.log('SHAKE IS MAGIC!!!');
      commit('ADD_SHAKE', magicShakes[options.shakeName]);
      commit('FINISH_LOADING');
      return;
    }

    // request the shake from the API
    const response = await getFromApi(
      this.$auth.getToken(this.$auth.$state.strategy),
      `https://mltshp.com${options.endpoint}`
    );

    // handle errors
    if (response.error) {
      console.error('[SHAKE STORE] ERROR', response.error.message);
      commit('FINISH_LOADING');
      throw response.error;
    }

    // change keys to camelCase to match Vue prop naming convention
    const shake = camelcaseKeys(response, { deep: true });

    // store the shake object
    commit('ADD_SHAKE', shake);
    commit('FINISH_LOADING');
  },
};
