<template>
  <header>
    <div class="logo">
      <NuxtLink to="/">MLTSHP in Vue</NuxtLink>
    </div>
    <nav v-if="status === 'authenticated'" aria-labelledby="header-nav-title">
      <p id="header-nav-title" class="sr-only">Header Navigation</p>
      <ul>
        <li>
          <NuxtLink
            :class="[activePathClass('/before'), activePathClass('/after')]"
            to="/"
          >
            Friend Shake
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            :to="`/user/${user?.name}`"
            :class="[activePathClass(`/user/${user?.name}`)]"
          >
            Your Shake
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :class="[activePathClass('/likes')]" to="/likes">
            Your Favorites
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :class="[activePathClass('/popular')]" to="/popular">
            Popular
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :class="[activePathClass('/incoming')]" to="/incoming">
            Incoming!
          </NuxtLink>
        </li>
        <li v-for="shake in groupShakes" :key="shake.id" class="shake">
          <NuxtLink :to="shake.path" :class="[activePathClass(shake.path)]">
            {{
              shake.name.length > 20
                ? `${shake.name.substring(0, 20)}…`
                : shake.name
            }}
          </NuxtLink>
        </li>
        <li><NuxtLink to="/upload">New Post</NuxtLink></li>
      </ul>
    </nav>
    <AppUserMenu v-if="status === 'authenticated'" :user="user" />
    <div v-else>
      <button @click="signIn()">
        <span>Login</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { AuthUser } from '~/types/AuthUser';

const route = useRoute();
const { status, data: authData, signIn } = useAuth();
const user = authData.value?.user as AuthUser | undefined;

// The user shake is always in slot 0, so we can just slice it off
const groupShakes = computed(() => {
  if (user && user.shakes.length > 0) return user?.shakes.slice(1);
  return user?.shakes;
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
