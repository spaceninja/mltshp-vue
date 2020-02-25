<template>
  <div>
    <h1>User Detail Page: {{ user && user.name }}</h1>
    <p>Details about this user.</p>
    <AppAlert v-if="error" :name="error.name" :message="error.message" />
    <UserDetail v-else :user="user" />
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
