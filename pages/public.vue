<template>
  <div>
    <p>You should see this page without need to authentication!</p>
    <nuxt-link to="/">Home</nuxt-link>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  options: {
    auth: false,
  },
};
</script>
