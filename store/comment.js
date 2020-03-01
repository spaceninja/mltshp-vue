import { makeApiRequest } from '~/services/mltshp';
import Comment from '@/models/Comment';
const camelcaseKeys = require('camelcase-keys');

export const state = () => ({
  loading: false,
});

export const mutations = {
  START_LOADING: state => (state.loading = true),
  FINISH_LOADING: state => (state.loading = false),
  ADD_COMMENTS(state, comments) {
    console.log('[COMMENT STORE] ADD', comments);
    Comment.insertOrUpdate({ data: comments });
  },
};

export const actions = {
  /**
   * Fetch an array of Posts for a Shake from the API
   *
   * @param {object} context
   * @param {string} sharekey - the sharekey of the post to load comments for
   */
  async fetchComments({ commit }, sharekey) {
    console.log('[COMMENT STORE] FETCH COMMENTS', sharekey);
    commit('START_LOADING');

    // request the comments from the API
    const response = await makeApiRequest(
      this.$auth.getToken(this.$auth.$state.strategy),
      `https://mltshp.com/api/sharedfile/${sharekey}/comments`
    );

    // handle errors
    if (response.error) {
      console.error('[COMMENT STORE] ERROR', response.error);
      commit('FINISH_LOADING');
      throw response.error;
    }

    // grab the array of comments
    // change keys to camelCase to match Vue prop naming convention
    const comments = camelcaseKeys(response.comments, { deep: true });

    // massage the data
    comments.forEach(comment => {
      // add an id
      comment.id = `${Date.parse(comment.postedAt)}${comment.user.id}`;
      // add the post sharekey to the comment
      comment.post = { sharekey };
    });

    // store the comments array
    commit('ADD_COMMENTS', comments);
    commit('FINISH_LOADING');
  },
};
