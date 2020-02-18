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
          <h2>To-Do List</h2>
          <ul>
            <li>Load shake via pathname instead of ID.</li>
            <li>Posts should be able to belong to more than one shake.</li>
            <li>Load data for special pages like incoming and popular.</li>
            <li>Load comments for posts on post detail page.</li>
            <li>Paginate posts.</li>
            <li>Any styling, like, at all?</li>
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
export default {
  auth: false,
};
</script>
