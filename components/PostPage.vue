<template>
  <div>
    <h1>Post Detail Page: {{ post && post.title }}</h1>
    <p>Details about this post.</p>
    <PostDetail v-bind="post" />
    <CommentList :comments="comments" />
  </div>
</template>

<script>
import CommentList from '@/components/CommentList';
import PostDetail from '@/components/PostDetail';

export default {
  components: {
    CommentList,
    PostDetail,
  },
  props: {
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
