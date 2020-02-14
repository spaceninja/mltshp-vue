<template>
  <div>
    <div>
      <h1>This is a secure page!</h1>
    </div>
    <div>
      <h2>State</h2>
      <pre>{{ state }}</pre>
    </div>
    <div>
      <h2>Token</h2>
      {{ token || '-' }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    state() {
      return JSON.stringify(this.$auth.$state, undefined, 2);
    },
    token() {
      const token = this.$auth.getToken(this.$auth.$state.strategy);
      return token.access_token;
    },
  },
};
</script>
