import { getFromApi } from '~/services/mltshp';

export const state = () => ({
  user: {},
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};

export const actions = {
  async getUser(context, slug) {
    console.group('[USER STORE] FETCH', slug);

    const token = this.$auth.getToken(this.$auth.$state.strategy);
    console.log('[USER STORE] TOKEN', token);

    const user = await getFromApi(
      token,
      `https://mltshp.com/api/user_name/${slug}`
    );
    console.log('[USER STORE] USER', user);

    // Store the user object
    context.commit('setUser', user);
    console.groupEnd();
  },
};
