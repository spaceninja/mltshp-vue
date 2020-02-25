import { getFromApi } from '~/services/mltshp';
import Post from '@/models/Post';

export const mutations = {
  ADD_POSTS(state, posts) {
    console.log('[POST STORE] ADD', posts);
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
   * @param {number} object.shakeId - the ID of the shake to add to the posts
   */
  async fetchPosts({ commit }, options) {
    console.log('[POST STORE] FETCH POSTS', options);

    // load the token from auth state
    const token = this.$auth.getToken(this.$auth.$state.strategy);

    // request the posts from the API
    const result = await getFromApi(
      token,
      `https://mltshp.com${options.endpoint}`
    );

    // handle errors
    if (result.error) {
      console.error('[POST STORE] ERROR', result.error.message);
      throw result.error;
    }

    // grab the list of sharedfiles (array name differs by endpoint)
    const posts =
      result.sharedfiles ||
      result.incoming ||
      result.favorites ||
      result.friend_shake ||
      result.magicfiles;

    // massage the data
    posts.forEach(post => {
      // Add the shake ID to each post, preserving any existing shake IDs
      // empty array to hold the final shake objects
      const shakeObjects = [];

      // empty set to hold shake IDs
      const shakeSet = new Set();

      // add the current shake's ID to the set
      shakeSet.add(options.shakeId);

      // load the post from the store if it already exists
      const existingPost = Post.find(post.sharekey);

      // if the existing post has any shakes, add them to the set
      if (existingPost && existingPost.shake_ids) {
        existingPost.shake_ids.forEach(id => shakeSet.add(id));
      }

      // add each ID from the set to the array as an object
      shakeSet.forEach(id => shakeObjects.push({ id }));

      // add the shake ID objects to the post so Vuex ORM can read them
      post.shakes = shakeObjects;

      // rename `comments` to `comment_count` so we can use `comments` for the comments array
      post.comment_count = post.comments;
      delete post.comments;
    });

    // Store the post object
    commit('ADD_POSTS', posts);
  },

  /**
   * Fetch a single Post from the API
   *
   * @param {object} context
   * @param {string} key - the posts's sharekey
   */
  async fetchPost({ commit }, key) {
    console.log('[POST STORE] FETCH POST', key);

    // load the token from auth state
    const token = this.$auth.getToken(this.$auth.$state.strategy);

    // request the post from the API
    const post = await getFromApi(
      token,
      `https://mltshp.com/api/sharedfile/${key}`
    );

    // handle errors
    if (post.error) {
      console.error('[POST STORE] ERROR', post.error.message);
      throw post.error;
    }

    // store the post object
    commit('ADD_POSTS', post);
  },
};
