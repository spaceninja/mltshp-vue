<template>
  <div>
    <h1>This route is protected!</h1>
    <h3>
      {{ route.path }} can only be accessed when logged in. Please login below.
    </h3>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
