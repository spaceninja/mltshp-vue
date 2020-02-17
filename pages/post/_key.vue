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
export default {
  validate({ params }) {
    return params.key;
  },
  computed: {
    PostModel() {
      return this.$store.$db().model('posts');
    },
    post() {
      return this.PostModel.query()
        .where('sharekey', this.$route.params.key)
        .withAll()
        .first();
    },
    isLoading() {
      return this.$store.state.loading;
    },
  },
  created() {
    this.$store.dispatch('post/fetchPost', this.$route.params.key);
  },
};
</script>
