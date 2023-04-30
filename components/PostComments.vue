<template>
  <div>
    <CommentList v-if="data.comments.length" :comments="data.comments" />
    <AppLoading v-else-if="pending" />
    <AppError v-else-if="error" :error="error" />
    <CommentForm @new-comment="refresh" />
  </div>
</template>

<script setup lang="ts">
// Load the comments for this post
const route = useRoute();
const { data, pending, error, refresh } = await useFetch('/api/mltshp', {
  headers: useRequestHeaders(['cookie']) as HeadersInit,
  query: { path: `/api/sharedfile/${route.params.key}/comments` },
});
</script>
