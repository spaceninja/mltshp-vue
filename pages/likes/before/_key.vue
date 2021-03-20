<template>
  <ShakeLoader :before-key="$route.params.key" shake-name="likes" />
</template>

<script>
import ShakeLoader from '@/components/ShakeLoader';

export default {
  components: {
    ShakeLoader,
  },
  validate({ params }) {
    return params.key;
  },
  async fetch({ store, params }) {
    // load the shake details
    const shake = await store
      .dispatch('shake/fetchShake', {
        endpoint: '/api/shake_name/likes',
        shakeName: 'likes',
      })
      .catch((error) => console.error(error));

    // once we have the shake's ID, load the posts
    await store
      .dispatch('post/fetchPosts', {
        endpoint: `/api/${shake && shake.id}/before/${params.key}`,
        shakeId: shake && shake.id,
        beforeKey: params.key,
      })
      .catch((error) => console.error(error));
  },
};
</script>
