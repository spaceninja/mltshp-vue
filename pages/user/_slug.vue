<template>
  <div>
    <h1>User Detail Page: {{ $route.params.slug }}</h1>
    <p>Details about this user.</p>
    <img v-if="isLoading" src="/images/loading-mltshp.gif" alt="Loading…" />
    <div v-if="!isLoading && !user">
      <h1 style="color:red">User Not Found</h1>
    </div>
    <h2>User Shakes</h2>
    <ul v-if="user && user.shakes">
      <li v-for="shake in user.shakes" :key="shake.id">
        <nuxt-link :to="`/shake/${shake.id}`">{{ shake.name }}</nuxt-link>
      </li>
    </ul>
    <h2>User Object</h2>
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
