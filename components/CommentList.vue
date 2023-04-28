<template>
  <div>
    <h2>Comments</h2>
    <ol>
      <CommentDetail
        v-for="(comment, index) in comments"
        :key="index"
        :comment="comment"
        @reply-to="replyToRepeater"
      />
    </ol>
  </div>
</template>

<script setup lang="ts">
import { MltshpComment } from '~/types/MltshpComment';

const emit = defineEmits(['reply-to']);

defineProps<{
  comments: MltshpComment[];
}>();

const replyToRepeater = (username: string) => {
  emit('reply-to', username);
};
</script>
