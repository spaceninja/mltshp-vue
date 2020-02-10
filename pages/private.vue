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
      User: <b-badge>{{ $auth.hasScope('user') }}</b-badge> Test:
      <b-badge>{{ $auth.hasScope('test') }}</b-badge> Admin:
      <b-badge>{{ $auth.hasScope('admin') }}</b-badge>
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
      return JSON.stringify(this.$auth.$state, undefined, 2)
    }
  }
}
</script>
