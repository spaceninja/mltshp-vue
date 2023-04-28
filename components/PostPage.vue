<template>
  <div>
    <h1>{{ post.title }}</h1>
    <a :href="post.original_image_url">
      <img
        :src="post.original_image_url"
        :alt="post.title"
        :width="post.width / 2"
        :height="post.height / 2"
      />
    </a>
    <LikeButton :sharekey="post.sharekey" :liked="post.liked" />
    <hr />
    <PostComments v-if="post.comments" />
  </div>
</template>

<script setup lang="ts">
import { MltshpFile } from '~/types/MltshpFile';

defineProps<{
  post: MltshpFile;
}>();
</script>
