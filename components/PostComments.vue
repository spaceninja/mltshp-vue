<template>
  <div>
    <CommentList v-if="allComments.length" :comments="allComments" />
    <AppLoading v-else-if="pending" />
    <AppError v-else-if="error" :error="error" />
    <CommentForm />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { data, pending, error } = await useFetch('/api/mltshp', {
  headers: useRequestHeaders(['cookie']) as HeadersInit,
  query: { path: `/api/sharedfile/${route.params.key}/comments` },
});

const { postedComments } = useComment();

const allComments = computed(() => [
  ...data.value.comments,
  ...postedComments.value,
]);
</script>
