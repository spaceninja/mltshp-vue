<template>
  <div>
    <Navbar />
    <div>
      <AuthenticationStatus />
    </div>
    <Welcome />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '🔐 nuxt-auth-example',
});
</script>
