<template>
  <div v-if="user" class="user-menu">
    <button :aria-expanded="`${!isUserMenuHidden}`" @click="toggleUserMenu">
      <span class="sr-only">User Menu</span>
      <img :src="user.profile_image_url" aria-hidden alt="" width="25" />
    </button>
    <div :hidden="isUserMenuHidden" class="user-menu__panel">
      <img :src="user.profile_image_url" aria-hidden alt="" width="100" />
      <p>Logged in as {{ userDisplayName }}</p>
      <p v-if="userDisplayName !== user.name">{{ user.name }}</p>
      <ul>
        <li>
          <a href="https://mltshp.com/account/settings/profile">
            Edit your profile on MLTSHP.com
          </a>
        </li>
        <li>
          <button @click="$auth.logout()">
            Log Out
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isUserMenuHidden: true,
    };
  },
  computed: {
    userShakes() {
      // there will probably only ever be one, and it will likely be shakes[0],
      // but let's play it safe
      return this.user.shakes.filter((shake) => shake.type === 'user');
    },
    userDisplayName() {
      return this.userShakes[0].name || this.user.name;
    },
  },
  methods: {
    toggleUserMenu() {
      console.log('TOGGLE USER MENU');
      this.isUserMenuHidden = !this.isUserMenuHidden;
    },
  },
};
</script>

<style lang="scss" scoped>
.user-menu {
  position: relative;
}
.user-menu__panel {
  background: var(--color-page-bg);
  border: 1px solid currentColor;
  left: 0;
  padding: 1em;
  position: absolute;
  top: 100%;
}
</style>
