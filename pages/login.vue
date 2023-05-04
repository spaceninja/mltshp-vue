<!-- file: ~/pages/login.vue -->
<template>
  <div>
    <h1>You are logged out!</h1>
    <p>
      In order to use this site, you'll need to log in with your MLTSHP account.
    </p>
    <button @click="signIn('mltshp')">Log In with MLTSHP</button>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Log In',
});

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
});

const { signIn } = useAuth();
</script>
