<template>
  <div>
    <h1>Post: {{ route.params.key }}</h1>
    <a v-if="image" :href="image.permalink_page">
      <img :src="image.original_image_url" :alt="image.title" />
    </a>
    <pre>{{ JSON.stringify(image, undefined, 2) }}</pre>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { data: image } = await useFetch('/api/mltshp', {
  headers: useRequestHeaders(['cookie']) as HeadersInit,
  query: { path: `/api/sharedfile/${route.params.key}` },
});
</script>

<style scoped></style>
