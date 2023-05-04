<template>
  <div>
    <NuxtLink v-if="post.original_image_url" :to="postLink">
      <img
        :srcset="`
          ${post.original_image_url}?width=${imgWidth}&dpr=1 1x,
          ${post.original_image_url}?width=${imgWidth}&dpr=2 2x,
          ${post.original_image_url}?width=${imgWidth}&dpr=2 2.5x
        `"
        :src="`${post.original_image_url}?width=${imgWidth}`"
        :alt="post.title"
        :width="imgWidth"
        :height="imgHeight"
        loading="lazy"
        decoding="async"
      />
    </NuxtLink>
    <VideoEmbed v-if="post.url" :url="post.url" />
  </div>
</template>

<script setup lang="ts">
import { MltshpFile } from '~/types/MltshpFile';

const props = defineProps<{
  post: MltshpFile;
  postLink: string | undefined;
}>();

const constrainedWidth = 550;

const imgWidth = computed(() =>
  props.post.width >= constrainedWidth ? constrainedWidth : props.post.width
);

const aspectRatio = computed(() => props.post.height / props.post.width);

const imgHeight = computed(() => imgWidth.value * aspectRatio.value);
</script>

<style scoped>
img {
  display: block;
}

a {
  display: inline-block; /* shrink-wrap the link */
}
</style>
