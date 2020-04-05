<template>
  <AppAlert v-if="error" :error="error" />
  <UserPage v-else :name="name" :user="user" />
</template>

<script>
import User from '@/models/User';
import AppAlert from '@/components/AppAlert';
import UserPage from '@/components/UserPage';

export default {
  components: {
    AppAlert,
    UserPage,
  },
  props: {
    userName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      error: null,
    };
  },
  computed: {
    user() {
      return User.query().where('name', this.userName).withAll().first();
    },
    name() {
      return this.user && this.user.shakes && this.user.shakes[0]
        ? this.user.shakes[0].name
        : this.userName;
    },
  },
  created() {
    this.$store
      .dispatch('user/fetchUser', this.userName)
      .catch((error) => (this.error = error));
  },
  head() {
    return {
      title: this.name,
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
