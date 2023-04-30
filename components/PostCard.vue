<template>
  <li>
    <PostDetails :post="post" :is-detail="false" />
    <PostActions
      :post="post"
      :is-own-post="isOwnPost(post, user)"
      :is-editable="false"
      :user="user"
    />
  </li>
</template>

<script setup lang="ts">
import { AuthUser } from '~/types/AuthUser';
import { MltshpFile } from '~/types/MltshpFile';

defineProps<{
  post: MltshpFile;
}>();

// Get the authenticated user
const { data: authData } = useAuth();
const user = authData.value?.user as AuthUser | undefined;

// Is this a post by the user? If so, we'll hide the like button, etc.
const { isOwnPost } = usePost();
</script>
