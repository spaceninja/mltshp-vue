<template>
  <div>
    <PostPage v-if="post" :post="post" />
    <AppLoading v-else-if="pendingPost" />
    <AppError v-else-if="errorPost" :error="errorPost" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const {
  data: post,
  pending: pendingPost,
  error: errorPost,
} = await useFetch('/api/mltshp', {
  headers: useRequestHeaders(['cookie']) as HeadersInit,
  query: { path: `/api/sharedfile/${route.params.key}` },
});

useHead({
  title: post.value?.title,
});
</script>
