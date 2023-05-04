<template>
  <div>
    <PostDetails :post="post" :is-detail="true" />
    <PostActions
      :post="post"
      :is-own-post="isOwnPost(post, user)"
      :is-editable="true"
      :user="user"
      @edited="refreshPost"
    />
    <PostComments />
  </div>
</template>

<script setup lang="ts">
import { AuthUser } from '~/types/AuthUser';
import { MltshpFile } from '~/types/MltshpFile';

const emit = defineEmits(['refresh']);

defineProps<{
  post: MltshpFile;
}>();

// Get the authenticated user
const { data: authData } = useAuth();
const user = authData.value?.user as AuthUser | undefined;

// Is this a post by the user? If so, we'll hide the like button, etc.
const { isOwnPost } = usePost();

// Reload the post after editing
const refreshPost = () => {
  emit('refresh');
};
</script>
