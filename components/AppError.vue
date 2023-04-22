<template>
  <div>
    <strong>{{ error.statusCode }} Error!</strong>
    {{ error.statusMessage || error.message }}
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
