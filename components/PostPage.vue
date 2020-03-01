<template>
  <div>
    <PostDetail v-bind="post" />
    <hr />
    <CommentList :comments="comments" />
    <CommentForm :sharekey="post && post.sharekey" />
  </div>
</template>

<script>
import CommentForm from '@/components/CommentForm';
import CommentList from '@/components/CommentList';
import PostDetail from '@/components/PostDetail';

export default {
  components: {
    CommentForm,
    CommentList,
    PostDetail,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    post: {
      type: Object,
      default: null,
    },
    comments: {
      type: Array,
      default: null,
    },
  },
};
</script>
