<template>
  <div class="container">
    <div>
      <h1 class="title">
        MLTSHP in Vue
      </h1>
      <div>
        User status:
        <strong>{{ $auth.$state.loggedIn ? 'Logged In' : 'Guest' }}</strong>
      </div>
      <div class="links">
        <template v-if="$auth.$state.loggedIn">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <nuxt-link :to="`/user/${this.$auth.user.name}`"
                >Your Shake</nuxt-link
              >
            </li>
            <li><nuxt-link to="/likes">Your Favorites</nuxt-link></li>
            <li><nuxt-link to="/friends">Your Friends Shake</nuxt-link></li>
            <li><nuxt-link to="/incoming">Incoming!</nuxt-link></li>
            <li><nuxt-link to="/popular">Popular</nuxt-link></li>
            <li><nuxt-link to="/all">All Posts</nuxt-link></li>
            <li>
              <nuxt-link to="/user/beep">Beep's Profile</nuxt-link>
            </li>
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
          <ShakeLoader shake-name="friends" />
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
import ShakeLoader from '@/components/ShakeLoader';

export default {
  auth: false,
  components: {
    ShakeLoader,
  },
};
</script>
