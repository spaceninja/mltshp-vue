<!-- file: ~/pages/login.vue -->
<template>
  <div>
    <p>Sign-In:</p>
    <button @click="signIn('mltshp')">MLTSHP</button>
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
