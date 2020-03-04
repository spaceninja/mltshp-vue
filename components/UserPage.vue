<template>
  <div>
    <h1>User Detail Page: {{ name }}</h1>
    <p>Details about this user.</p>
    <ShakeList :shakes="user && user.shakes" />
    <UserDetail v-bind="user" />
  </div>
</template>

<script>
import ShakeList from '@/components/ShakeList';
import UserDetail from '@/components/UserDetail';

export default {
  components: {
    ShakeList,
    UserDetail,
  },
  props: {
    name: {
      type: String,
      default: null,
    },
    user: {
      type: Object,
      default: null,
    },
  },
};
</script>
