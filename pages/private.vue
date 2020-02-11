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
      <h2>Scopes</h2>
      <ul>
        <li>User: {{ $auth.hasScope('user') }}</li>
        <li>Test: {{ $auth.hasScope('test') }}</li>
        <li>Admin: {{ $auth.hasScope('admin') }}</li>
      </ul>
    </div>
    <div>
      <h2>Token</h2>
      {{ $auth.token || '-' }}
    </div>
    <nuxt-link to="/">Home</nuxt-link>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  computed: {
    state() {
      return JSON.stringify(this.$auth.$state, undefined, 2);
    },
  },
};
</script>
