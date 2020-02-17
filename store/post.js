import { getFromApi } from '~/services/mltshp';
import Post from '@/models/Post';

export const mutations = {
  ADD_POSTS(state, posts) {
    console.log('ADD POSTS TO STORE', posts);
    Post.insertOrUpdate({ data: posts });
  },
};

export const actions = {
  /**
   *
   * @param {object} context
   * @param {object} options
   * @param {string} object.endpoint - the API endpoint to fetch posts from
   * @param {number} [object.shakeId] - the ID of the shake to add to the posts
   */
  async fetchPostsFromShake({ commit }, options) {
    console.group('[POST STORE] FETCH POSTS FOR SHAKE', options);
    commit('START_LOADING', null, { root: true });

    // load the token
    const token = this.$auth.getToken(this.$auth.$state.strategy);
    console.log('TOKEN', token);

    // request the posts from the API
    const result = await getFromApi(
      token,
      `https://mltshp.com${options.endpoint}`
    );

    // handle errors
    if (result.error) {
      console.error('ERROR', result.error.message);
      console.groupEnd();
      commit('FINISH_LOADING', null, { root: true });
      return;
    }

    // Store the post object
    console.log('API RESULT', result);

    const posts = result.sharedfiles;

    // Add the shake object and ID
    // TODO: this makes an association but is destructive of any existing associations
    if (options.shakeId) {
      posts.forEach(post => {
        post.shakes = [{ id: options.shakeId }];
      });
    }

    commit('ADD_POSTS', posts);
    commit('FINISH_LOADING', null, { root: true });
    console.groupEnd();
  },

  /**
   * Fetch a single Post from the API
   * @param {object} context
   * @param {string} key - the posts's sharekey
   */
  async fetchPost({ commit }, key) {
    console.group('[POST STORE] FETCH POST', key);
    commit('START_LOADING', null, { root: true });

    // see if the post is already in the store
    const foundPost = Post.query()
      .where('sharekey', key)
      .first();

    if (foundPost) {
      console.log('POST ALREADY IN STATE!');
      commit('FINISH_LOADING', null, { root: true }); // in memory already
    } else {
      console.warn('POST NOT FOUND IN STATE');

      // load the token
      const token = this.$auth.getToken(this.$auth.$state.strategy);
      console.log('TOKEN', token);

      // request the post from the API
      const post = await getFromApi(
        token,
        `https://mltshp.com/api/sharedfile/${key}`
      );

      // handle errors
      if (post.error) {
        console.error('ERROR', post.error.message);
        console.groupEnd();
        commit('FINISH_LOADING', null, { root: true });
        return;
      }

      // Store the post object
      console.log('API RESULT', post);
      commit('ADD_POSTS', post);
      commit('FINISH_LOADING', null, { root: true });
    }
    console.groupEnd();
  },
};
