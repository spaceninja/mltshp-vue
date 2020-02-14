<template>
  <div>
    <h1>User Detail Page: {{ $route.params.slug }}</h1>
    <p>Details about this user.</p>
    <pre>{{ JSON.stringify(user, undefined, 2) }}</pre>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
  validate({ params }) {
    return params.slug;
  },
  created() {
    this.$store.dispatch('user/getUser', this.$route.params.slug);
  },
};
</script>
