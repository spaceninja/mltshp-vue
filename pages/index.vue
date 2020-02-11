<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        mltshp-vue
      </h1>
      <h2 class="subtitle">
        MLTSHP in Vue
      </h2>
      <div>
        User status:
        <strong>{{ $auth.$state.loggedIn ? 'Logged In' : 'Guest' }}</strong>
      </div>
      <div class="links">
        <template v-if="$auth.$state.loggedIn">
          <nuxt-link class="button--green" to="/private">Private</nuxt-link>
          <button class="button--green" @click="$auth.logout()">
            Logout
          </button>
        </template>
        <nuxt-link v-else to="/login" class="button--green">LOG IN</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue';

export default {
  components: {
    Logo,
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
