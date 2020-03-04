<template>
  <ShakeLoader :shake-name="$route.params.slug" :is-user="true" />
</template>

<script>
import ShakeLoader from '@/components/ShakeLoader';

export default {
  validate({ params }) {
    return params.slug;
  },
  components: {
    ShakeLoader,
  },
  async fetch({ store, params }) {
    // load the shake details
    const shake = await store
      .dispatch('shake/fetchShake', {
        endpoint: `/api/shake_user/${params.slug}`,
        shakeName: params.slug,
      })
      .catch(error => console.error(error));

    // load the full user object
    if (shake && shake.owner.name) {
      await store
        .dispatch('user/fetchUser', shake.owner.name)
        .catch(error => console.error(error));
    }

    // once we have the shake's ID, load the posts
    if (shake && shake.id) {
      await store
        .dispatch('post/fetchPosts', {
          endpoint: `/api/shakes/${shake && shake.id}`,
          shakeId: shake && shake.id,
        })
        .catch(error => console.error(error));
    }
  },
};
</script>
