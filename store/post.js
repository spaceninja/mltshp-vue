import { getFromApi } from '~/services/mltshp';
import Post from '@/models/Post';

export const mutations = {
  ADD_POSTS(state, posts) {
    console.log('ADD POSTS TO STORE', posts);
    Post.insertOrUpdate({ data: posts });
  },
};

export const actions = {
  async fetchPostsFromShake({ commit }, endpoint) {
    console.group('[POST STORE] FETCH POSTS FOR SHAKE', endpoint);
    commit('START_LOADING', null, { root: true });

    // load the token
    const token = this.$auth.getToken(this.$auth.$state.strategy);
    console.log('TOKEN', token);

    // request the posts from the API
    const posts = await getFromApi(token, `https://mltshp.com${endpoint}`);

    // TODO: Add the shake object and ID

    // handle errors
    if (posts.error) {
      console.error('ERROR', posts.error.message);
      console.groupEnd();
      commit('FINISH_LOADING', null, { root: true });
      return;
    }

    // Store the post object
    console.log('API RESULT', posts);
    commit('ADD_POSTS', posts.sharedfiles);
    commit('FINISH_LOADING', null, { root: true });
    console.groupEnd();
  },
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
