<template>
  <UserLoader :user-name="$route.params.slug" />
</template>

<script>
import UserLoader from '@/components/UserLoader';

export default {
  validate({ params }) {
    return params.slug;
  },
  components: {
    UserLoader,
  },
};
</script>
