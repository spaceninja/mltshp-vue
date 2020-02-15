<template>
  <div>
    <h1>User Detail Page: {{ $route.params.slug }}</h1>
    <p>Details about this user.</p>
    <h1 v-if="isLoading">Loading…</h1>
    <pre>{{ JSON.stringify(user, undefined, 2) }}</pre>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters['user/getUserBySlug'](this.$route.params.slug);
    },
    isLoading() {
      return this.$store.state.loading;
    },
  },
  validate({ params }) {
    return params.slug;
  },
  created() {
    this.$store.dispatch('user/fetchUser', this.$route.params.slug);
  },
};
</script>
