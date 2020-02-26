import { getFromApi } from '~/services/mltshp';
import Post from '@/models/Post';
import Page from '@/models/Page';
const camelcaseKeys = require('camelcase-keys');

export const mutations = {
  ADD_POSTS(state, posts) {
    console.log('[POST STORE] ADD POSTS', posts);
    Post.insertOrUpdate({ data: posts });
  },
  ADD_PAGE(state, pages) {
    console.log('[POST STORE] ADD PAGE', pages);
    Page.insertOrUpdate({ data: pages });
  },
};

export const actions = {
  /**
   * Fetch an array of Posts for a Shake from the API
   *
   * @param {object} context
   * @param {object} options
   * @param {string} options.endpoint - the API endpoint to fetch posts from
   * @param {number} options.shakeId - the ID of the shake to add to the posts
   * @param {number} [options.beforeKey] - pagination: load posts before this sharekey
   * @param {number} [options.afterKey] - pagination: load posts after this sharekey
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

    // grab the array of sharedfiles (array name differs by endpoint)
    const sharedfiles =
      result.sharedfiles ||
      result.incoming ||
      result.favorites ||
      result.friend_shake ||
      result.magicfiles;

    // change keys to camelCase to match Vue prop naming convention
    const posts = camelcaseKeys(sharedfiles, { deep: true });

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
      post.commentCount = post.comments;
      delete post.comments;
    });

    // construct the page object
    let pageId = `${options.shakeId}-root`;
    if (options.beforeKey) {
      pageId = `${options.shakeId}-before-${options.beforeKey}`;
    }
    if (options.afterKey) {
      pageId = `${options.shakeId}-after-${options.afterKey}`;
    }
    const firstSharekey = posts[0].sharekey;
    const lastSharekey = posts[posts.length - 1].sharekey;
    const page = {
      id: pageId,
      first_key: firstSharekey,
      last_key: lastSharekey,
      posts,
      shake: { id: options.shakeId },
    };

    // store the posts and pages objects
    commit('ADD_POSTS', posts);
    commit('ADD_PAGE', page);
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
    const response = await getFromApi(
      token,
      `https://mltshp.com/api/sharedfile/${key}`
    );

    // handle errors
    if (response.error) {
      console.error('[POST STORE] ERROR', response.error.message);
      throw response.error;
    }

    // change keys to camelCase to match Vue prop naming convention
    const post = camelcaseKeys(response, { deep: true });

    // store the post object
    commit('ADD_POSTS', post);
  },
};
