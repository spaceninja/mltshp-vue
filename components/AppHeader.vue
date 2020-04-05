<template>
  <header>
    <div class="logo">
      <nuxt-link to="/">MLTSHP in Vue</nuxt-link>
    </div>
    <nav v-if="$auth.loggedIn" aria-labelledby="header-nav-title">
      <p id="header-nav-title" class="sr-only">Header Navigation</p>
      <ul>
        <li>
          <nuxt-link
            :class="[
              currentPath.startsWith('/before') ||
              currentPath.startsWith('/after')
                ? 'is-active'
                : '',
            ]"
            to="/"
            exact
          >
            Friend Shake
          </nuxt-link>
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
            :class="[currentPath.startsWith('/likes') ? 'is-active' : '']"
            to="/likes"
          >
            Your Favorites
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            :class="[currentPath.startsWith('/popular') ? 'is-active' : '']"
            to="/popular"
          >
            Popular
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            :class="[currentPath.startsWith('/incoming') ? 'is-active' : '']"
            to="/incoming"
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
    <UserMenu v-if="$auth.loggedIn" :user="$auth.user" />
  </header>
</template>

<script>
import UserMenu from '@/components/UserMenu';

export default {
  components: {
    UserMenu,
  },
  computed: {
    nonUserShakes() {
      return this.$auth.user.shakes.filter((shake) => shake.type !== 'user');
    },
    currentPath() {
      return this.$route.path;
    },
  },
};
</script>
