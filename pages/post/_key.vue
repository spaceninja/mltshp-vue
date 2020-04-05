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
  async fetch({ store, params }) {
    // load the post
    const post = await store
      .dispatch('post/fetchPost', params.key)
      .catch((error) => console.error(error));

    // if there are comments, load them too
    if (post && post.commentCount > 0) {
      await store
        .dispatch('comment/fetchComments', params.key)
        .catch((error) => console.error(error));
    }
  },
};
</script>
