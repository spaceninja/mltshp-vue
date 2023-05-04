<template>
  <div>
    <h1 class="error-uh-oh">{{ error.statusCode }} Error</h1>
    <p class="error-p">
      {{ error.statusMessage || error.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
/**
 * 1. Listen, errors are hard to type, okay?
 * @see https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
 */
defineProps<{
  error: any; // 1
}>();
</script>
