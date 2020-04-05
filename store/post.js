import { makeApiRequest, postFormData } from '~/services/mltshp';
import Post from '@/models/Post';
import Page from '@/models/Page';
const camelcaseKeys = require('camelcase-keys');

export const state = () => ({
  loading: false,
  error: null,
});

export const mutations = {
  START_LOADING: (state) => (state.loading = true),
  FINISH_LOADING: (state) => (state.loading = false),
  SET_ERROR: (state, error) => (state.error = error),
  CLEAR_ERROR: (state) => (state.error = null),
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
    commit('CLEAR_ERROR');
    commit('START_LOADING');

    // request the posts from the API
    const response = await makeApiRequest(
      this.$auth.getToken(this.$auth.$state.strategy),
      `https://mltshp.com${options.endpoint}`
    );

    // handle errors
    if (response.error) {
      console.error(
        '[POST STORE] ERROR',
        typeof response.error,
        response.error.message
      );
      commit('SET_ERROR', response.error);
      commit('FINISH_LOADING');
      throw response.error;
    }

    // grab the array of sharedfiles (array name differs by endpoint)
    const sharedfiles =
      response.sharedfiles ||
      response.incoming ||
      response.favorites ||
      response.friend_shake ||
      response.magicfiles;

    // change keys to camelCase to match Vue prop naming convention
    const posts = camelcaseKeys(sharedfiles, { deep: true });

    // massage the data
    posts.forEach((post) => {
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
        existingPost.shake_ids.forEach((id) => shakeSet.add(id));
      }

      // add each ID from the set to the array as an object
      shakeSet.forEach((id) => shakeObjects.push({ id }));

      // add the shake ID objects to the post so Vuex ORM can read them
      post.shakes = shakeObjects;

      // rename `comments` to `commentCount` so we can use `comments` for the comments array
      post.commentCount = post.comments;
      delete post.comments;
    });

    if (posts.length) {
      // construct the page object
      let pageId = `${options.shakeId}-root`;
      if (options.beforeKey) {
        pageId = `${options.shakeId}-before-${options.beforeKey}`;
      }
      if (options.afterKey) {
        pageId = `${options.shakeId}-after-${options.afterKey}`;
      }
      const firstPivotId = posts[0].pivotId;
      const lastPivotId = posts[posts.length - 1].pivotId;
      const page = {
        id: pageId,
        first_key: firstPivotId,
        last_key: lastPivotId,
        posts,
        shake: { id: options.shakeId },
      };

      // store the posts and pages objects
      commit('ADD_POSTS', posts);
      commit('ADD_PAGE', page);
    }

    commit('FINISH_LOADING');
    return posts;
  },

  /**
   * Fetch a single Post from the API
   *
   * @param {object} context
   * @param {string} key - the posts's sharekey
   */
  async fetchPost({ state, commit, dispatch }, key) {
    console.log('[POST STORE] FETCH POST', key);
    commit('CLEAR_ERROR');
    commit('START_LOADING');

    // request the post from the API
    const response = await makeApiRequest(
      this.$auth.getToken(this.$auth.$state.strategy),
      `https://mltshp.com/api/sharedfile/${key}`
    );

    // handle errors
    if (response.error) {
      console.error('[POST STORE] ERROR', response.error);
      commit('SET_ERROR', response.error);
      commit('FINISH_LOADING');
      throw response.error;
    }

    // change keys to camelCase to match Vue prop naming convention
    const post = camelcaseKeys(response, { deep: true });

    // massage the data
    post.commentCount = post.comments;
    delete post.comments;

    // store the post object
    commit('ADD_POSTS', post);
    commit('FINISH_LOADING');
    return post;
  },

  /**
   * Post a like for a file to the API
   *
   * @param {object} context
   * @param {object} options
   * @param {string} options.sharekey - the sharekey of the post to like
   */
  async toggleLike({ commit }, options) {
    console.log('[POST STORE] TOGGLE LIKE', options);

    // request the post from the API
    const response = await makeApiRequest(
      this.$auth.getToken(this.$auth.$state.strategy),
      `https://mltshp.com/api/sharedfile/${options.sharekey}/like`,
      'POST'
    );

    // handle errors
    if (response.error) {
      console.error('[POST STORE] ERROR', response.error);
      throw response.error;
    }

    // store the post object
    commit('ADD_POSTS', response);
  },

  /**
   * Post a save for a file to the API
   *
   * @param {object} context
   * @param {object} options
   * @param {string} options.sharekey - the sharekey of the post to save
   * @param {number} [options.shakeId] - what shake to save the post to
   */
  async toggleSave({ commit }, options) {
    console.log('[POST STORE] TOGGLE SAVE', options);

    const body = options.shakeId ? { shake_id: options.shakeId } : null;
    console.log('[POST STORE] BODY', body);

    // request the post from the API
    const response = await makeApiRequest(
      this.$auth.getToken(this.$auth.$state.strategy),
      `https://mltshp.com/api/sharedfile/${options.sharekey}/save`,
      'POST',
      body
    );

    // handle errors
    if (response.error) {
      console.error('[POST STORE] ERROR', response.error);
      throw response.error;
    }

    // store the post object
    commit('ADD_POSTS', response);
  },

  /**
   * Post a comment to a file to the API
   *
   * @param {object} context
   * @param {object} options
   * @param {string} options.sharekey - the sharekey of the post to comment on
   * @param {number} options.comment - the text of the comment to post
   */
  async postComment({ commit }, options) {
    console.log('[POST STORE] TOGGLE SAVE', options);

    const body = options.comment ? { body: options.comment } : null;
    console.log('[POST STORE] BODY', body);

    // request the post from the API
    const response = await makeApiRequest(
      this.$auth.getToken(this.$auth.$state.strategy),
      `https://mltshp.com/api/sharedfile/${options.sharekey}/comments`,
      'POST',
      body
    );

    // handle errors
    if (response.error) {
      console.error('[POST STORE] ERROR', response.error);
      throw response.error;
    }

    // change keys to camelCase to match Vue prop naming convention
    const comment = camelcaseKeys(response, { deep: true });

    // massage the data
    // add an id
    comment.id = `${Date.parse(comment.postedAt)}${comment.user.id}`;
    // add the post sharekey to the comment
    comment.post = { sharekey: options.sharekey };

    // store the comment object
    commit('comment/ADD_COMMENTS', comment, { root: true });
  },

  /**
   * Post a comment to a file to the API
   *
   * @param {object} context
   * @param {object} options
   * @param {string} options.sharekey - the sharekey of the post to comment on
   * @param {string} [options.title] - text for the image title (optional)
   * @param {string} [options.description] - text for the image description (optional)
   */
  async editPost({ commit }, options) {
    console.log('[POST STORE] EDIT POST', options);

    const body = { title: options.title, description: options.description };
    console.log('[POST STORE] BODY', body);

    // request the post from the API
    const response = await makeApiRequest(
      this.$auth.getToken(this.$auth.$state.strategy),
      `https://mltshp.com/api/sharedfile/${options.sharekey}`,
      'POST',
      body
    );

    // handle errors
    if (response.error) {
      console.error('[POST STORE] ERROR', response.error);
      throw response.error;
    }

    // store the post object
    commit('ADD_POSTS', response);
  },

  /**
   * Upload a file to the API
   *
   * @param {object} context
   * @param {object} body
   * @param {object} body.file - the file object to upload
   * @param {string} [body.title] - text for the image title (optional)
   * @param {string} [body.description] - text for the image description (optional)
   * @param {number} [body.shake_id] - numeric ID of the shake to post to (optional)
   */
  async uploadFile({ dispatch }, body) {
    console.log('[POST STORE] TOGGLE SAVE', body);

    // request the post from the API
    const response = await postFormData(
      this.$auth.getToken(this.$auth.$state.strategy),
      'https://mltshp.com/api/upload',
      body
    );

    // handle errors
    if (response.error) {
      console.error('[POST STORE] ERROR', response.error);
      throw response.error;
    }

    // store the post object
    dispatch('fetchPost', response.share_key).then(() => {
      console.log('REDIRECT TO', response.share_key);
      this.$router.push({
        path: `/post/${response.share_key}`,
      });
    });
    return response;
  },
};
