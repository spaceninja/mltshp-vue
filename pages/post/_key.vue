<template>
  <div>
    <h1>Post Detail Page {{ $route.params.key }}</h1>
    <p>Details about this post.</p>
    <img v-if="isLoading" src="/images/loading-mltshp.gif" alt="Loading…" />
    <h2>Post Object</h2>
    <pre>{{ JSON.stringify(post, undefined, 2) }}</pre>
  </div>
</template>

<script>
import Post from '@/models/Post';

export default {
  validate({ params }) {
    return params.key;
  },
  computed: {
    post() {
      return Post.query()
        .where('sharekey', this.$route.params.key)
        .withAll()
        .first();
    },
    isLoading() {
      return this.$store.state.post.loading;
    },
    title() {
      if (this.post && this.post.title) {
        return this.post.title;
      }
      return this.$route.params.id;
    },
    description() {
      if (this.post && this.post.description) {
        return this.post.description;
      }
      return '';
    },
  },
  created() {
    this.$store.dispatch('post/fetchPost', this.$route.params.key);
  },
  head() {
    return {
      title: `${this.title} - MLTSHP in Vue`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
      ],
    };
  },
};
</script>
