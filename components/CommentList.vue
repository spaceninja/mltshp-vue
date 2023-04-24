<template>
  <div>
    <h2>Comments</h2>
    <ol>
      <CommentDetail
        v-for="(comment, index) in comments"
        :key="index"
        :comment="comment"
      />
    </ol>
  </div>
</template>

<script setup lang="ts">
import { MltshpComment } from '~/types/MltshpComment';

defineProps<{
  comments: MltshpComment[];
}>();
</script>
