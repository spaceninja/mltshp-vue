<template>
  <div>
    <h1>
      {{ post.title || post.name }}
    </h1>
    <NSFWShield v-if="post.nsfw" :width="post.width" :height="post.height">
      <PostMedia :post="post" />
    </NSFWShield>
    <PostPage v-else :post="post" />
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
    <button v-if="isOwnPost && !isEditing" type="button" @click="toggleEditing">
      Edit
    </button>
    <PostEdit
      v-if="isOwnPost && isEditing"
      :title="post.title"
      :description="post.description"
      :sharekey="post.sharekey"
      @save="refreshPost"
      @cancel="toggleEditing"
    />
    <hr />
    <PostComments v-if="post.comments" />
  </div>
</template>

<script setup lang="ts">
import { AuthUser } from '~/types/AuthUser';
import { MltshpFile } from '~/types/MltshpFile';

const emit = defineEmits(['refresh']);

const props = defineProps<{
  post: MltshpFile;
}>();

const isEditing = ref(false);

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

const toggleEditing = () => {
  isEditing.value = !isEditing.value;
};

const refreshPost = () => {
  emit('refresh');
  toggleEditing();
};
</script>
