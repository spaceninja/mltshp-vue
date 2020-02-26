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
};
</script>
