<template>
  <div>
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
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 1em;
}

nav ul {
  list-style: none;
  margin: 1em 0;
  padding: 0;
}

nav ul li {
  display: inline;
}

nav ul li + li {
  margin-left: 0.5em;
  padding-left: 0.5em;
  border-left: 1px solid silver;
}

.logo {
  font-weight: bold;
}
</style>
