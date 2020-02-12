<template>
  <div>
    <div v-if="$auth.$state.redirect">
      You have to login before accessing to
      <strong>{{ $auth.$state.redirect }}</strong>
    </div>
    <button type="button" @click="$auth.loginWith('mltshp')">
      Login with MLTSHP
    </button>
    <nuxt-link to="/">Home</nuxt-link>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
};
</script>
