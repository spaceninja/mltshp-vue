<template>
  <header>
    <div class="logo">
      <nuxt-link to="/">MLTSHP in Vue</nuxt-link>
    </div>
    <nav v-if="$auth.$state.loggedIn">
      <ul>
        <li><nuxt-link to="/">Friend Shake</nuxt-link></li>
        <li>
          <nuxt-link :to="`/user/${this.$auth.user.name}`">
            Your Shake
          </nuxt-link>
        </li>
        <li><nuxt-link to="/likes">Your Favorites</nuxt-link></li>
        <li><nuxt-link to="/popular">Popular</nuxt-link></li>
        <li><nuxt-link to="/incoming">Incoming!</nuxt-link></li>
        <li v-for="shake in nonUserShakes" :key="shake.id">
          <nuxt-link :to="shake.url">{{ shake.name }}</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/user/beep">b</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/user/tweedlydo">t</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/user/artwells">a</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/user/jessamyn">j</nuxt-link>
        </li>
        <li>
          <button @click="$auth.logout()">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    nonUserShakes() {
      return this.$auth.user.shakes.filter(shake => shake.type !== 'user');
    },
  },
};
</script>

<style lang="scss" scoped></style>
