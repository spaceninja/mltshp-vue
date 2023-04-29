<template>
  <div>
    <PostPage v-if="post" :post="post" @refresh="refresh()" />
    <AppLoading v-else-if="pending" />
    <AppError v-else-if="error" :error="error" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const {
  data: post,
  pending,
  error,
  refresh,
} = await useFetch('/api/mltshp', {
  headers: useRequestHeaders(['cookie']) as HeadersInit,
  query: { path: `/api/sharedfile/${route.params.key}` },
});

useHead({
  title: post.value?.title,
});
</script>
