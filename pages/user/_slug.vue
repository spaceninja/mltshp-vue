<template>
  <div>
    <h1>User Detail Page: {{ $route.params.slug }}</h1>
    <p>Details about this user.</p>
    <img v-if="isLoading" src="/images/loading-mltshp.gif" alt="Loading…" />
    <h2>User Shakes</h2>
    <ol v-if="user && user.shakes">
      <li v-for="shake in user.shakes" :key="shake.id">
        <nuxt-link :to="`/shake/${shake.id}`">{{ shake.name }}</nuxt-link>
      </li>
    </ol>
    <h2>User Object</h2>
    <pre>{{ JSON.stringify(user, undefined, 2) }}</pre>
  </div>
</template>

<script>
import User from '@/models/User';

export default {
  validate({ params }) {
    return params.slug;
  },
  computed: {
    user() {
      return User.query()
        .where('name', this.$route.params.slug)
        .with('shakes')
        .first();
    },
    isLoading() {
      return this.$store.state.user.loading;
    },
    name() {
      if (this.user && this.user.shakes) {
        return this.user.shakes[0].name;
      }
      return this.$route.params.slug;
    },
    description() {
      if (this.user && this.user.about) {
        return this.user.about;
      }
      return '';
    },
  },
  created() {
    this.$store.dispatch('user/fetchUser', this.$route.params.slug);
  },
  head() {
    return {
      title: `${this.name} - MLTSHP in Vue`,
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
