<template>
  <header class="app-header">
    <div class="app-header__logo">
      <strong>
        <NuxtLink to="/">MLTSHP in Vue</NuxtLink>
      </strong>
    </div>
    <nav
      v-if="status === 'authenticated'"
      class="app-header__nav"
      aria-labelledby="header-nav-title"
    >
      <p id="header-nav-title" class="sr-only">Header Navigation</p>
      <ul class="app-header__nav-list">
        <li class="app-header__nav-item">
          <NuxtLink
            to="/"
            :class="[activePathClass('/before'), activePathClass('/after')]"
          >
            Friend Shake
          </NuxtLink>
        </li>
        <li class="app-header__nav-item">
          <NuxtLink
            :to="`/user/${user?.name}`"
            :class="[activePathClass(`/user/${user?.name}`)]"
          >
            Your Shake
          </NuxtLink>
        </li>
        <li class="app-header__nav-item">
          <NuxtLink to="/likes" :class="[activePathClass('/likes')]">
            Your Favorites
          </NuxtLink>
        </li>
        <li class="app-header__nav-item">
          <NuxtLink to="/popular" :class="[activePathClass('/popular')]">
            Popular
          </NuxtLink>
        </li>
        <li class="app-header__nav-item">
          <NuxtLink to="/incoming" :class="[activePathClass('/incoming')]">
            Incoming!
          </NuxtLink>
        </li>
        <li
          v-for="shake in groupShakes"
          :key="shake.id"
          class="app-header__nav-item"
        >
          <NuxtLink :to="shake.path" :class="[activePathClass(shake.path)]">
            {{
              shake.name.length > 20
                ? `${shake.name.substring(0, 20)}…`
                : shake.name
            }}
          </NuxtLink>
        </li>
        <li class="app-header__nav-item">
          <NuxtLink to="/upload">New Post</NuxtLink>
        </li>
      </ul>
    </nav>
    <AppUserMenu :user="user" />
  </header>
</template>

<script setup lang="ts">
import { AuthUser } from '~/types/AuthUser';

const route = useRoute();
const { status, data: authData } = useAuth();
const user = authData.value?.user as AuthUser | undefined;

// The user shake is always in slot 0, so we can just slice it off
const groupShakes = computed(() => {
  if (!user || !user.shakes || user.shakes.length < 1) return [];
  return user?.shakes.slice(1);
});

/**
 * Active Path Class
 * NuxtLink will add the active class for us, but we also want the nav items
 * to be active if we're on their paginated routes. So we check if the current
 * route's path starts with the root path and manually apply the active class.
 */
const activePathClass = (path: string) =>
  route.path.startsWith(path) ? 'is-active' : '';
</script>
