<template>
  <div>
    <PostDetails :post="post" :is-own-post="isOwnPost" />
    <PostActions
      :post="post"
      :is-own-post="isOwnPost"
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

const props = defineProps<{
  post: MltshpFile;
}>();

// Is this a post by the user? If so, we'll hide the like button, etc.
const { data: authData } = useAuth();
const user = authData.value?.user as AuthUser | undefined;
const isOwnPost = computed(() => props.post.user.name === user?.name);

// Reload the post after editing
const refreshPost = () => {
  emit('refresh');
};
</script>
