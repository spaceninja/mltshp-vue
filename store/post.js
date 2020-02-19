import { getFromApi } from '~/services/mltshp';
import Post from '@/models/Post';

export const state = () => ({
  loading: false,
});

export const mutations = {
  START_LOADING: state => (state.loading = true),
  FINISH_LOADING: state => (state.loading = false),
  ADD_POSTS(state, posts) {
    console.log('ADD POSTS TO STORE', posts);
    Post.insertOrUpdate({ data: posts });
  },
};

export const actions = {
  /**
   * Fetch an array of Posts for a Shake from the API
   *
   * @param {object} context
   * @param {object} options
   * @param {string} object.endpoint - the API endpoint to fetch posts from
   * @param {number} [object.shakeId] - the ID of the shake to add to the posts
   */
  async fetchPosts({ commit }, options) {
    console.group('[POST STORE] FETCH POSTS FOR SHAKE', options);
    commit('START_LOADING');

    // load the token
    const token = this.$auth.getToken(this.$auth.$state.strategy);
    console.log('TOKEN', token);

    // request the posts from the API
    const result = await getFromApi(
      token,
      `https://mltshp.com${options.endpoint}`
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
    const posts =
      result.sharedfiles ||
      result.incoming ||
      result.favorites ||
      result.friend_shake ||
      result.magicfiles;

    // Add the shake ID to the post, preserving any existing shake IDs
    if (options.shakeId) {
      posts.forEach(post => {
        // empty array to hold the final shake objects
        const shakeObjects = [];

        // empty set to hold shake IDs
        const shakeSet = new Set();

        // load the post from the store if it already exists
        const existingPost = Post.find(post.sharekey);

        // add the current shake's ID to the set
        shakeSet.add(options.shakeId);

        // if the existing post has any shakes, add them to the set
        if (existingPost && existingPost.shake_ids) {
          existingPost.shake_ids.forEach(id => shakeSet.add(id));
        }

        // add each ID from the set to the array as an object
        shakeSet.forEach(id => shakeObjects.push({ id }));

        // add the shake ID objects to the post so Vuex ORM can read them
        post.shakes = shakeObjects;
      });
    }

    // Store the post object
    commit('ADD_POSTS', posts);
    commit('FINISH_LOADING');
    console.groupEnd();
  },

  /**
   * Fetch a single Post from the API
   *
   * @param {object} context
   * @param {string} key - the posts's sharekey
   */
  async fetchPost({ commit }, key) {
    console.group('[POST STORE] FETCH POST', key);
    commit('START_LOADING');

    // load the token
    const token = this.$auth.getToken(this.$auth.$state.strategy);
    console.log('TOKEN', token);

    // request the post from the API
    const post = await getFromApi(
      token,
      `https://mltshp.com/api/sharedfile/${key}`
    );
    console.log('API RESULT', post);

    // handle errors
    if (post.error) {
      console.error('ERROR', post.error.message);
      console.groupEnd();
      commit('FINISH_LOADING');
      return;
    }

    // Store the post object
    commit('ADD_POSTS', post);
    commit('FINISH_LOADING');
    console.groupEnd();
  },
};
