<template>
  <div>
    <template v-if="comments && comments.length">
      <h2>Comments</h2>
      <ol>
        <CommentDetail
          v-for="comment in comments"
          :key="comment.id"
          v-bind="comment"
          @reply-to="setReplyTo"
        />
      </ol>
    </template>
    <CommentForm :sharekey="sharekey" :reply-to="replyTo" />
  </div>
</template>

<script>
import CommentDetail from '@/components/CommentDetail';
import CommentForm from '@/components/CommentForm';

export default {
  components: {
    CommentDetail,
    CommentForm,
  },
  props: {
    comments: {
      type: Array,
      default: null,
    },
    sharekey: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      replyTo: '',
    };
  },
  methods: {
    setReplyTo(username) {
      this.replyTo = username;
    },
  },
};
</script>

<style lang="scss" scoped></style>
