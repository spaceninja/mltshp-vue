<template>
  <ShakeLoader :before-key="$route.params.key" shake-name="friends" />
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
        endpoint: '/api/shake_name/friends',
        shakeName: 'friends',
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
