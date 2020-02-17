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
import User from '@/models/User';
import Shake from '@/models/Shake';
import Post from '@/models/Post';

export default {
  validate({ params }) {
    return params.id;
  },
  computed: {
    shake() {
      return Shake.query()
        .withAll()
        .whereId(Number(this.$route.params.id))
        .first();
    },
    shakeUser() {
      // TODO: this should now always come from the shake object
      if (this.shake && this.shake.user) {
        console.log('[SHAKE PAGE] FOUND USER IN SHAKE');
        return this.shake.user;
      }

      if (this.shake && this.shake.user_id) {
        console.log('[SHAKE PAGE] FOUND USER ID IN SHAKE');
        return User.query()
          .whereId(this.shake.user_id)
          .with('shakes')
          .first();
      }

      console.error('[SHAKE PAGE] NO USER OR USER ID');
      return null;
    },
    posts() {
      return Post.query()
        .where('shake_ids', array =>
          array.includes(Number(this.$route.params.id))
        )
        .get();
    },
    isLoading() {
      return this.$store.state.loading;
    },
  },
  created() {
    this.$store.dispatch('shake/fetchShake', this.$route.params.id);
    this.$store.dispatch('post/fetchPostsFromShake', {
      endpoint: `/api/shakes/${this.$route.params.id}`,
      shakeId: Number(this.$route.params.id),
    });
  },
};
</script>
