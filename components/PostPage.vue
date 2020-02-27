<template>
  <div>
    <PostDetail v-bind="post" />
    <hr />
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
