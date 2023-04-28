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
    <p v-html="formattedDescription" />
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

const { data: authData } = useAuth();
const user = authData.value?.user as AuthUser | undefined;

const props = defineProps<{
  post: MltshpFile;
}>();

const isOwnPost = computed(() => props.post.user.name === user?.name);

const formattedDescription = computed(() =>
  simpleFormatter(props.post.description)
);
</script>
