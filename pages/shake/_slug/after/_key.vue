<template>
  <ShakeLoader
    :shake-name="$route.params.slug"
    :after-key="$route.params.key"
  />
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
        endpoint: `/api/shake_name/${params.slug}`,
        shakeName: params.slug,
      })
      .catch(error => console.error(error));

    // once we have the shake's ID, load the posts
    if (shake && shake.id) {
      await store
        .dispatch('post/fetchPosts', {
          endpoint: `/api/shakes/${shake && shake.id}/after/${params.key}`,
          shakeId: shake && shake.id,
          afterKey: params.key,
        })
        .catch(error => console.error(error));
    }
  },
};
</script>
