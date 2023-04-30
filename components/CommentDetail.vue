<template>
  <li>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="formattedBody" />
    <ul>
      <li>Posted at: {{ comment.posted_at }}</li>
      <li>
        Posted by:
        <NuxtLink :to="`/user/${comment.user.name}`">{{
          comment.user.name
        }}</NuxtLink>
      </li>
      <li>
        <img
          v-if="comment.user.profile_image_url"
          :src="comment.user.profile_image_url"
          alt=""
          width="50"
          loading="lazy"
        />
      </li>
      <li>
        <button @click="setReplyTo">Reply</button>
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
import { MltshpComment } from '~/types/MltshpComment';

const props = defineProps<{
  comment: MltshpComment;
}>();

// Save the comment author's name to state for use in the comment form
const { replyTo } = useComment();
const setReplyTo = () => {
  replyTo.value = props.comment.user.name;
};

// Apply formatting to the comment
const formattedBody = computed(() => simpleFormatter(props.comment.body));
</script>
