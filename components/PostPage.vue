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
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="formattedDescription" />
    <LikeButton
      v-if="!isOwnPost"
      :sharekey="post.sharekey"
      :liked="post.liked"
    />
    <SaveButton
      v-if="user?.shakes && !isOwnPost"
      :sharekey="post.sharekey"
      :saved="post.saved"
      :shakes="user.shakes"
    />
    <hr />
    <PostComments v-if="post.comments" />
  </div>
</template>

<script setup lang="ts">
import { AuthUser } from '~/types/AuthUser';
import { MltshpFile } from '~/types/MltshpFile';

const props = defineProps<{
  post: MltshpFile;
}>();

// Is this a post by the user? If so, we'll hide the like button, etc.
const { data: authData } = useAuth();
const user = authData.value?.user as AuthUser | undefined;
const isOwnPost = computed(() => props.post.user.name === user?.name);

// Reset any existing comment state
const { resetCommentState } = useComment();
resetCommentState();

// Apply formatting to the post description
const formattedDescription = computed(() =>
  simpleFormatter(props.post.description ?? '')
);
</script>
