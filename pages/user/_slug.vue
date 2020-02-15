<template>
  <div>
    <h1>User Detail Page: {{ $route.params.slug }}</h1>
    <p>Details about this user.</p>
    <img v-if="isLoading" src="/images/loading-mltshp.gif" alt="Loading…" />
    <pre>{{ JSON.stringify(user, undefined, 2) }}</pre>
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return params.slug;
  },
  computed: {
    user() {
      return this.$store.getters['user/getUserBySlug'](this.$route.params.slug);
    },
    isLoading() {
      return this.$store.state.loading;
    },
  },
  created() {
    this.$store.dispatch('user/fetchUser', this.$route.params.slug);
  },
};
</script>
