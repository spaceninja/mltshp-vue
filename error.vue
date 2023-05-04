<template>
  <div>
    <AppHeader />
    <hr />
    <main>
      <AppError :error="error" />
    </main>
    <hr />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
/**
 * 1. Listen, errors are hard to type, okay?
 * @see https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
 */
defineProps<{
  error: any;
}>();
</script>
