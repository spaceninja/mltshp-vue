<template>
  <div>
    <h1>User Detail Page: {{ user && user.name }}</h1>
    <p>Details about this user.</p>
    <AppAlert v-if="error" :name="error.name" :message="error.message" />
    <template v-else>
      <UserDetail :user="user" />
      <h2>User Shakes</h2>
      <ol v-if="user && user.shakes">
        <li v-for="shake in user.shakes" :key="shake.id">
          <nuxt-link :to="`/shake${shake.url}`">{{ shake.name }}</nuxt-link>
        </li>
      </ol>
    </template>
  </div>
</template>

<script>
import User from '@/models/User';
import AppAlert from '@/components/AppAlert';
import UserDetail from '@/components/UserDetail';

export default {
  validate({ params }) {
    return params.slug;
  },
  components: {
    AppAlert,
    UserDetail,
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
