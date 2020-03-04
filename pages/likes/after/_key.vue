<template>
  <ShakeLoader shake-name="likes" :after-key="$route.params.key" />
</template>

<script>
import ShakeLoader from '@/components/ShakeLoader';

export default {
  validate({ params }) {
    return params.key;
  },
  components: {
    ShakeLoader,
  },
  async fetch({ store, params }) {
    // load the shake details
    const shake = await store
      .dispatch('shake/fetchShake', {
        endpoint: '/api/shake_name/likes',
        shakeName: 'likes',
      })
      .catch(error => console.error(error));

    // once we have the shake's ID, load the posts
    await store
      .dispatch('post/fetchPosts', {
        endpoint: `/api/${shake && shake.id}/after/${params.key}`,
        shakeId: shake && shake.id,
        afterKey: params.key,
      })
      .catch(error => console.error(error));
  },
};
</script>
