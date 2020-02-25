<template>
  <div>
    <h1>Shake List Page: {{ shake && shake.name }}</h1>
    <p>A list of the most recent posts from this shake.</p>
    <img v-if="isLoading" src="/images/loading-mltshp.gif" alt="Loading…" />
    <div v-if="error" style="color:red">
      <strong>{{ error.name }}</strong> {{ error.message }}
    </div>
    <h2>Shake Posts</h2>
    <ol v-if="posts">
      <li v-for="post in posts" :key="post.sharekey">
        <nuxt-link :to="`/post/${post.sharekey}`">{{
          post.title || post.name
        }}</nuxt-link>
      </li>
    </ol>
    <h2>Shake Object</h2>
    <pre>{{ JSON.stringify(shake, undefined, 2) }}</pre>
    <h3>Shake Posts Array</h3>
    <pre>{{ JSON.stringify(posts, undefined, 2) }}</pre>
  </div>
</template>

<script>
import Shake from '@/models/Shake';
import Post from '@/models/Post';

export default {
  validate({ params }) {
    return params.slug;
  },
  data() {
    return {
      error: null,
    };
  },
  computed: {
    shake() {
      return Shake.query()
        .where('url', `/${this.$route.params.slug}`)
        .withAll()
        .first();
    },
    posts() {
      return Post.query()
        .where('shake_ids', array => array.includes(this.shake.id))
        .get();
    },
    isLoading() {
      return this.$store.state.shake.loading || this.$store.state.post.loading;
    },
  },
  created() {
    this.$store
      .dispatch(
        'shake/fetchShake',
        `/api/shake_name/${this.$route.params.slug}`
      )
      .then(data => {
        console.log('LOAD SHAKE THEN LOAD POSTS FOR SHAKE', this.shake.id);
        this.$store
          .dispatch('post/fetchPosts', {
            endpoint: `/api/shakes/${this.shake.id}`,
            shakeId: this.shake.id,
          })
          .catch(error => (this.error = error));
      })
      .catch(error => (this.error = error));
  },
  head() {
    return {
      title: `${
        this.shake && this.shake.name
          ? this.shake.name
          : this.$route.params.slug
      } - MLTSHP in Vue`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            this.shake && this.shake.description
              ? this.shake.description
              : null,
        },
      ],
    };
  },
};
</script>
