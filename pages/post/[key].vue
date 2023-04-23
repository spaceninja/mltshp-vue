<template>
  <div>
    <h1>Post: {{ route.params.key }}</h1>
    <div v-if="post">
      <a :href="post.permalink_page">
        <img :src="post.original_image_url" :alt="post.title" />
      </a>
      <pre>{{ JSON.stringify(post, undefined, 2) }}</pre>
    </div>
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
} = await useFetch('/api/mltshp', {
  query: { path: `/api/sharedfile/${route.params.key}` },
});
</script>
