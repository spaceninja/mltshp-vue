import { getFromApi } from '~/services/mltshp';
import Comment from '@/models/Comment';
const camelcaseKeys = require('camelcase-keys');

export const mutations = {
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

    // load the token from auth state
    const token = this.$auth.getToken(this.$auth.$state.strategy);

    // request the comments from the API
    const response = await getFromApi(
      token,
      `https://mltshp.com/api/sharedfile/${sharekey}/comments`
    );

    // handle errors
    if (response.error) {
      console.error('[COMMENT STORE] ERROR', response.error.message);
      throw response.error;
    }

    console.log('[COMMENT STORE] RESPONSE', response);

    // grab the array of comments
    // change keys to camelCase to match Vue prop naming convention
    const comments = camelcaseKeys(response.comments, { deep: true });

    // massage the data
    comments.forEach(comment => {
      // add an id
      comment.id = `${comment.user.id}${Date.parse(comment.posted_at)}`;
      // add the post sharekey to the comment
      comment.post = { sharekey };
    });

    // store the comments array
    commit('ADD_COMMENTS', comments);
  },
};
