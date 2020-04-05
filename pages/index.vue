<template>
  <ShakeLoader v-if="$auth.$state.loggedIn" shake-name="friends" />
  <LoggedOut v-else />
</template>

<script>
import ShakeLoader from '@/components/ShakeLoader';
import LoggedOut from '@/components/LoggedOut';

export default {
  auth: false,
  components: {
    ShakeLoader,
    LoggedOut,
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
        endpoint: `/api/${shake && shake.id}`,
        shakeId: shake && shake.id,
      })
      .catch((error) => console.error(error));
  },
};
</script>
