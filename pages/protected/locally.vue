<template>
  <div>
    <h1>I am publicly available!</h1>
    <h3>
      The global protecting is disabled via
      <a
        href="https://github.com/sidebase/nuxt-auth#disabling-the-global-middleware-locally"
        target="_blank"
        >local middleware</a
      >.
    </h3>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ auth: false });
</script>
