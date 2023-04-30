<template>
  <div>
    <a v-if="post.original_image_url" :href="post.original_image_url">
      <img
        :src="post.original_image_url"
        :alt="post.title"
        :width="post.width"
        :height="post.height"
      />
    </a>
    <VideoEmbed v-if="post.url" :url="post.url" />
  </div>
</template>

<script setup lang="ts">
import { MltshpFile } from '~/types/MltshpFile';

defineProps<{
  post: MltshpFile;
}>();
</script>

<style scoped>
img {
  display: block;
}
</style>
