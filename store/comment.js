import { getFromApi } from '~/services/mltshp';
import Comment from '@/models/Comment';

export const state = () => ({
  loading: false,
});

export const mutations = {
  START_LOADING: state => (state.loading = true),
  FINISH_LOADING: state => (state.loading = false),
  ADD_COMMENTS(state, comments) {
    console.log('ADD COMMENTS TO STORE', comments);
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
    console.group('[COMMENT STORE] FETCH COMMENTS FOR POST', sharekey);
    commit('START_LOADING');

    // load the token
    const token = this.$auth.getToken(this.$auth.$state.strategy);
    console.log('TOKEN', token);

    // request the posts from the API
    const result = await getFromApi(
      token,
      `https://mltshp.com/api/sharedfile/${sharekey}/comments`
    );
    console.log('API RESULT', result);

    // handle errors
    if (result.error) {
      console.error('ERROR', result.error.message);
      console.groupEnd();
      commit('FINISH_LOADING');
      return;
    }

    // grab the list of sharedfiles
    const comments = result.comments;

    comments.forEach(comment => {
      // add an id
      comment.id = `${comment.user.id}${Date.parse(comment.posted_at)}`;
      // add the post sharekey to the comment
      comment.post = { sharekey };
    });

    // Store the post object
    commit('ADD_COMMENTS', comments);
    commit('FINISH_LOADING');
    console.groupEnd();
  },
};
