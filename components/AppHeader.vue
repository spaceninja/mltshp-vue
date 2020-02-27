<template>
  <header>
    <div class="logo">
      <nuxt-link to="/">MLTSHP in Vue</nuxt-link>
    </div>
    <nav v-if="$auth.$state.loggedIn">
      <ul>
        <li><nuxt-link to="/examples">Examples</nuxt-link></li>
        <li><nuxt-link to="/">Friend Shake</nuxt-link></li>
        <li>
          <nuxt-link :to="`/user/${this.$auth.user.name}`">
            Your Shake
          </nuxt-link>
        </li>
        <li><nuxt-link to="/likes">Your Favorites</nuxt-link></li>
        <li><nuxt-link to="/popular">Popular</nuxt-link></li>
        <li><nuxt-link to="/incoming">Incoming!</nuxt-link></li>
        <li v-for="shake in nonUserShakes" :key="shake.id" class="shake">
          <nuxt-link :to="shake.url">{{
            shake.name.length > 20
              ? `${shake.name.substring(0, 20)}…`
              : shake.name
          }}</nuxt-link>
        </li>
      </ul>
    </nav>
    <button @click="$auth.logout()">
      Logout
    </button>
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
