<template>
  <div>
    <h1>Shake List Page: {{ $route.params.id }}</h1>
    <p>A list of the most recent posts from this shake.</p>
    <img v-if="isLoading" src="/images/loading-mltshp.gif" alt="Loading…" />
    <h2>Shake Posts</h2>
    <ul v-if="posts">
      <li v-for="post in posts" :key="post.sharekey">
        <nuxt-link :to="`/post/${post.sharekey}`">{{
          post.title || post.name
        }}</nuxt-link>
      </li>
    </ul>
    <h2>Shake Object</h2>
    <pre>{{ JSON.stringify(shake, undefined, 2) }}</pre>
    <h3>Shake User Object</h3>
    <pre>{{ JSON.stringify(shakeUser, undefined, 2) }}</pre>
    <h3>Shake Posts Array</h3>
    <pre>{{ JSON.stringify(posts, undefined, 2) }}</pre>
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return params.id;
  },
  computed: {
    ShakeModel() {
      return this.$store.$db().model('shakes');
    },
    shake() {
      return this.ShakeModel.query()
        .withAll()
        .whereId(Number(this.$route.params.id))
        .first();
    },
    UserModel() {
      return this.$store.$db().model('users');
    },
    shakeUser() {
      if (this.shake && this.shake.user) {
        console.log('[SHAKE PAGE] FOUND USER IN SHAKE');
        return this.shake.user;
      }

      if (this.shake && this.shake.user_id) {
        console.log('[SHAKE PAGE] FOUND USER ID IN SHAKE');
        return this.UserModel.query()
          .whereId(this.shake.user_id)
          .with('shakes')
          .first();
      }

      console.error('[SHAKE PAGE] NO USER OR USER ID');
      return null;
    },
    PostModel() {
      return this.$store.$db().model('posts');
    },
    posts() {
      // TODO: this should only load posts from this shake_id
      // possible solution: https://vuex-orm.github.io/vuex-orm/guide/model/relationships.html#many-to-many
      return this.PostModel.all(); // trying to load withAll breaks everything
    },
    isLoading() {
      return this.$store.state.loading;
    },
  },
  created() {
    this.$store.dispatch('shake/fetchShake', this.$route.params.id);
    this.$store.dispatch(
      'post/fetchPostsFromShake',
      `/api/shakes/${this.$route.params.id}`
    );
  },
};
</script>
