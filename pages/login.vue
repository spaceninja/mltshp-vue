<!-- file: ~/pages/login.vue -->
<template>
  <div>
    <p>Sign-In:</p>
    <button @click="signIn('github')">Github</button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
});

const { signIn } = useAuth();
</script>
