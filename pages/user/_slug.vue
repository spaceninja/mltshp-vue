<template>
  <div>
    <h1>User Detail Page: {{ user && user.name }}</h1>
    <p>Details about this user.</p>
    <img v-if="isLoading" src="/images/loading-mltshp.gif" alt="Loading…" />
    <div v-if="error" style="color:red">
      <strong>{{ error.name }}</strong> {{ error.message }}
    </div>
    <h2>User Shakes</h2>
    <ol v-if="user && user.shakes">
      <li v-for="shake in user.shakes" :key="shake.id">
        <nuxt-link :to="`/shake${shake.url}`">{{ shake.name }}</nuxt-link>
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
  data() {
    return {
      error: null,
    };
  },
  computed: {
    user() {
      return User.query()
        .where('name', this.$route.params.slug)
        .withAll()
        .first();
    },
    isLoading() {
      return this.$store.state.user.loading;
    },
  },
  created() {
    this.$store
      .dispatch('user/fetchUser', this.$route.params.slug)
      .catch(error => (this.error = error));
  },
  head() {
    return {
      title: `${
        this.user && this.user.shakes && this.user.shakes[0]
          ? this.user.shakes[0].name
          : this.$route.params.slug
      } - MLTSHP in Vue`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.user && this.user.about ? this.user.about : null,
        },
      ],
    };
  },
};
</script>
