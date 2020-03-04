<template>
  <header>
    <div class="logo">
      <nuxt-link to="/">MLTSHP in Vue</nuxt-link>
    </div>
    <nav v-if="$auth.$state.loggedIn" aria-labelledby="header-nav-title">
      <p id="header-nav-title" class="sr-only">Header Navigation</p>
      <ul>
        <li>
          <nuxt-link
            to="/"
            :class="[
              currentPath.startsWith('/before') ||
              currentPath.startsWith('/after')
                ? 'is-active'
                : '',
            ]"
            >Friend Shake</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            :to="`/user/${this.$auth.user.name}`"
            :class="[
              currentPath.startsWith(`/user/${this.$auth.user.name}`)
                ? 'is-active'
                : '',
            ]"
          >
            Your Shake
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/likes"
            :class="[currentPath.startsWith('/likes') ? 'is-active' : '']"
          >
            Your Favorites
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/popular"
            :class="[currentPath.startsWith('/popular') ? 'is-active' : '']"
          >
            Popular
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/incoming"
            :class="[currentPath.startsWith('/incoming') ? 'is-active' : '']"
          >
            Incoming!
          </nuxt-link>
        </li>
        <li v-for="shake in nonUserShakes" :key="shake.id" class="shake">
          <nuxt-link
            :to="shake.url"
            :class="[currentPath.startsWith(shake.url) ? 'is-active' : '']"
          >
            {{
              shake.name.length > 20
                ? `${shake.name.substring(0, 20)}…`
                : shake.name
            }}
          </nuxt-link>
        </li>
        <li><nuxt-link to="/upload">New Post</nuxt-link></li>
      </ul>
    </nav>
    <button v-if="$auth.$state.loggedIn" @click="$auth.logout()">
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
    currentPath() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped></style>
