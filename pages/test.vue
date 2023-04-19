<template>
  <div>
    <a v-if="image" :href="image.permalink_page">
      <img :src="image.original_image_url" :alt="image.title" />
    </a>
    <pre>{{ JSON.stringify(image, undefined, 2) }}</pre>
  </div>
</template>

<script setup lang="ts">
const headers = useRequestHeaders(['cookie']) as HeadersInit;
const { data: image } = await useFetch('/api/mltshp-test', { headers });
</script>
