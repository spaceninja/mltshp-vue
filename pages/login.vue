<template>
  <div>
    <div v-if="$auth.$state.redirect">
      You have to login before accessing to
      <strong>{{ $auth.$state.redirect }}</strong>
    </div>
    <button type="button" @click="$auth.loginWith('mltshp')">
      Login with MLTSHP
    </button>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Log In - MLTSHP in Vue',
    };
  },
};
</script>
