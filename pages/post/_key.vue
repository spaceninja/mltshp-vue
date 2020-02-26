<template>
  <PostLoader :post-key="$route.params.key" />
</template>

<script>
import PostLoader from '@/components/PostLoader';

export default {
  validate({ params }) {
    return params.key;
  },
  components: {
    PostLoader,
  },
};
</script>
