<template>
  <div class="actions">
    <LikeButton
      v-if="!isOwnPost"
      :sharekey="post.sharekey"
      :liked="post.liked"
    />
    <SaveButton
      v-if="!isOwnPost && user?.shakes"
      :sharekey="post.sharekey"
      :saved="post.saved"
      :shakes="user.shakes"
    />
    <button v-if="isOwnPost && !isEditing" type="button" @click="toggleEditing">
      Edit
    </button>
    <PostEditForm
      v-if="isOwnPost && isEditing"
      :title="post.title"
      :description="post.description"
      :sharekey="post.sharekey"
      @save="handleEdit"
      @cancel="toggleEditing"
    />
  </div>
</template>

<script setup lang="ts">
import { AuthUser } from '~/types/AuthUser';
import { MltshpFile } from '~/types/MltshpFile';

const emit = defineEmits(['edited']);

defineProps<{
  post: MltshpFile;
  isOwnPost: boolean;
  user: AuthUser | undefined;
}>();

const isEditing = ref(false);

const toggleEditing = () => {
  isEditing.value = !isEditing.value;
};

const handleEdit = () => {
  emit('edited');
  toggleEditing();
};
</script>
