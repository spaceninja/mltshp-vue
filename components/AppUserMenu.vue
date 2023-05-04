<template>
  <div v-if="user" class="user-menu">
    <button
      class="user-menu__toggle"
      :aria-expanded="!isUserMenuHidden"
      @click="toggleUserMenu"
    >
      <span class="sr-only">User Menu</span>
      <img
        v-if="user.image"
        class="user-menu__avatar"
        :src="user.image"
        alt=""
        width="32"
      />
    </button>
    <div :hidden="isUserMenuHidden" class="user-menu__panel">
      <p class="user-menu__name">
        Logged in as {{ displayName }}
        <span v-if="displayName !== user.name">({{ user.name }})</span>
      </p>
      <ul class="user-menu__actions">
        <li class="user-menu__action">
          <NuxtLink
            class="user-menu__profile"
            to="https://mltshp.com/account/settings/profile"
            >Edit your profile on MLTSHP.com</NuxtLink
          >
        </li>
        <li class="user-menu__action">
          <NuxtLink
            class="user-menu__settings"
            to="/settings"
            @click="toggleUserMenu"
            >Settings</NuxtLink
          >
        </li>
        <li class="user-menu__action">
          <button
            class="user-menu__logout"
            @click="signOut({ callbackUrl: '/' })"
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="user-menu">
    <button class="user-menu__login" @click="signIn()">
      <span>Login</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { AuthUser } from '~/types/AuthUser';

const props = defineProps<{
  user?: AuthUser;
}>();

const { signIn, signOut } = useAuth();

const isUserMenuHidden = ref(true);

const displayName = computed(() => {
  if (!props.user) return '';
  return props.user.fullName || props.user.name;
});

const toggleUserMenu = () => {
  isUserMenuHidden.value = !isUserMenuHidden.value;
};
</script>
