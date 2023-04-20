<template>
  <header>
    <div class="logo">
      <NuxtLink to="/">MLTSHP in Vue</NuxtLink>
    </div>
    <nav aria-labelledby="header-nav-title">
      <p id="header-nav-title" class="sr-only">Header Navigation</p>
      <ul>
        <li>
          <NuxtLink to="/protected/globally">Globally Protected</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/protected/locally">Locally Unprotected</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/api-routes">API Routes</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/test">TEST</NuxtLink>
        </li>
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
import { UserWithFullName } from '~/types/UserWithFullName';

const { status, data: authData, signIn } = useAuth();

const user = authData.value?.user as UserWithFullName | undefined;
</script>
