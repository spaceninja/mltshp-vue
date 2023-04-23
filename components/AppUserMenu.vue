<template>
  <div v-if="user" class="user-menu">
    <button :aria-expanded="!isUserMenuHidden" @click="toggleUserMenu">
      <span class="sr-only">User Menu</span>
      <img v-if="user.image" :src="user.image" alt="" width="32" />
    </button>
    <div :hidden="isUserMenuHidden" class="user-menu__panel">
      <p>
        Logged in as {{ displayName }}
        <span v-if="displayName !== user.name">({{ user.name }})</span>
      </p>
      <ul>
        <li>
          <NuxtLink to="https://mltshp.com/account/settings/profile">
            Edit your profile on MLTSHP.com
          </NuxtLink>
        </li>
        <li><NuxtLink to="/settings">Settings</NuxtLink></li>
        <li>
          <button @click="signOut({ callbackUrl: '/' })">Log Out</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AuthUser } from '~/types/AuthUser';

const props = defineProps<{
  user?: AuthUser;
}>();

const { signOut } = useAuth();

const isUserMenuHidden = ref(true);

const displayName = computed(() => {
  if (!props.user) return '';
  return props.user.fullName || props.user.name;
});

const toggleUserMenu = () => {
  console.log('TOGGLE USER MENU');
  isUserMenuHidden.value = !isUserMenuHidden.value;
};
</script>
