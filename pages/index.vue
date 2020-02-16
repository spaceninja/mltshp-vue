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
          <ul>
            <li>
              <nuxt-link :to="`/user/${this.$auth.user.name}`"
                >Your Profile</nuxt-link
              >
            </li>
            <li>
              <nuxt-link :to="`/shake/${this.$auth.user.shakes[0].id}`"
                >Your Shake</nuxt-link
              >
            </li>
            <li><nuxt-link to="/likes">Your Likes</nuxt-link></li>
            <li><nuxt-link to="/friends">Your Friends Shake</nuxt-link></li>
            <li><nuxt-link to="/incoming">Incoming!</nuxt-link></li>
            <li><nuxt-link to="/popular">Popular</nuxt-link></li>
            <li>
              <nuxt-link to="/user/tweedlydo">Tweedlydo's Profile</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/user/artwells">Art Well's Profile</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/user/jessamyn">Jessamyn's Profile</nuxt-link>
            </li>
            <li>
              <button @click="$auth.logout()">
                Logout
              </button>
            </li>
          </ul>
        </template>
        <template v-else>
          <button
            type="button"
            class="button--green"
            @click="$auth.loginWith('mltshp')"
          >
            Login with MLTSHP
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue';

export default {
  auth: false,
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
