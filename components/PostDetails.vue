<template>
  <div>
    <component :is="isDetail ? 'h1' : 'h2'">
      <NuxtLink v-if="!isDetail" :to="postLink">{{ displayTitle }}</NuxtLink>
      <template v-else>{{ displayTitle }}</template>
    </component>
    <NSFWShield v-if="post.nsfw" :width="post.width" :height="post.height">
      <PostMedia :post="post" :post-link="postLink" />
    </NSFWShield>
    <PostMedia v-else :post="post" :post-link="postLink" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="formattedDescription" />
    <ul>
      <li>Comment Count: {{ post.comments }}</li>
      <li>Views: {{ post.views }}</li>
      <li>Likes: {{ post.likes }}</li>
      <li>Saves: {{ post.saves }}</li>
      <li>
        Posted at:
        <NuxtLink :to="`/post/${post.sharekey}`">
          {{ post.posted_at }}
        </NuxtLink>
      </li>
      <li v-if="post.user">
        Posted by:
        <NuxtLink :to="`/user/${post.user.name}`">
          {{ post.user.name }}
        </NuxtLink>
        <img
          v-if="post.user.profile_image_url"
          :src="post.user.profile_image_url"
          alt=""
          width="20"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { MltshpFile } from '~/types/MltshpFile';

const props = defineProps<{
  post: MltshpFile;
  isDetail: boolean;
}>();

// Apply formatting to the post description
const formattedDescription = computed(() =>
  simpleFormatter(props.post.description ?? '')
);

// Link to the original URL on detail, the detail page otherwise
const postLink = computed(() =>
  props.isDetail
    ? props.post.original_image_url
    : `/post/${props.post.sharekey}`
);

// If no title, display filename. If no filename, display sharekey.
const displayTitle = computed(() => {
  if (props.post.title) return props.post.title;
  if (props.post.name) return props.post.name;
  return props.post.sharekey;
});
</script>
