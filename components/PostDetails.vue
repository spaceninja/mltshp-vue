<template>
  <div>
    <h1>
      {{ post.title || post.name }}
    </h1>
    <NSFWShield v-if="post.nsfw" :width="post.width" :height="post.height">
      <PostMedia :post="post" />
    </NSFWShield>
    <PostMedia v-else :post="post" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="formattedDescription" />
    <ul>
      <li>Comment Count: {{ post.comments }}</li>
      <li>Views: {{ post.views }}</li>
      <li>Likes: {{ post.likes }}</li>
      <li>Saves: {{ post.saves }}</li>
      <li>NSFW: {{ post.nsfw }}</li>
      <li>
        Posted at:
        <NuxtLink :to="`/post/${post.sharekey}`">
          {{ post.posted_at }}
        </NuxtLink>
      </li>
      <li v-if="post.user">
        Posted by:
        <nuxt-link :to="`/user/${post.user.name}`">
          {{ post.user.name }}
        </nuxt-link>
        <img
          v-if="post.user.profile_image_url"
          :src="post.user.profile_image_url"
          alt=""
          width="50"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { MltshpFile } from '~/types/MltshpFile';

const props = defineProps<{
  post: MltshpFile;
  isOwnPost: boolean;
}>();

// Apply formatting to the post description
const formattedDescription = computed(() =>
  simpleFormatter(props.post.description ?? '')
);
</script>
