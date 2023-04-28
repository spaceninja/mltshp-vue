<template>
  <div>
    <CommentList
      v-if="allComments.length"
      :comments="allComments"
      @reply-to="setReplyTo"
    />
    <AppLoading v-else-if="pending" />
    <AppError v-else-if="error" :error="error" />
    <CommentForm
      :sharekey="route.params.key"
      :reply-to="replyTo"
      @new-comment="handleNewComment"
    />
  </div>
</template>

<script setup lang="ts">
import { MltshpComment } from '~/types/MltshpComment';

const route = useRoute();
const { data, pending, error } = await useFetch('/api/mltshp', {
  headers: useRequestHeaders(['cookie']) as HeadersInit,
  query: { path: `/api/sharedfile/${route.params.key}/comments` },
});

const replyTo = ref('');
const newComment: Ref<MltshpComment | undefined> = ref(undefined);
const allComments = computed(() =>
  newComment.value
    ? [...data.value.comments, newComment.value]
    : data.value.comments
);

const setReplyTo = (username: string) => {
  replyTo.value = username;
};

const handleNewComment = (comment: MltshpComment) => {
  newComment.value = comment;
};
</script>
