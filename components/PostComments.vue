<template>
  <div>
    <CommentList v-if="allComments.length" :comments="allComments" />
    <AppLoading v-else-if="pending" />
    <AppError v-else-if="error" :error="error" />
    <CommentForm />
  </div>
</template>

<script setup lang="ts">
// Load the comments for this post
const route = useRoute();
const { data, pending, error } = await useFetch('/api/mltshp', {
  headers: useRequestHeaders(['cookie']) as HeadersInit,
  query: { path: `/api/sharedfile/${route.params.key}/comments` },
});

// Get any comments that are currently in state
const { postedComments } = useComment();

// Merge the two comment arrays
const allComments = computed(() => [
  ...data.value.comments,
  ...postedComments.value,
]);
</script>
