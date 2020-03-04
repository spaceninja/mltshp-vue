<template>
  <div v-if="posts && posts.length > 0">
    <h2>Posts</h2>
    <ol>
      <li v-for="(post, index) in posts" :key="post.sharekey">
        <PostCard v-bind="post" :lazy="index > 1" />
      </li>
    </ol>
  </div>
  <div v-else>
    <template v-if="isLoading">
      POST LIST SKELETON COMPONENT HERE
    </template>
    <template v-else>
      THIS SHAKE HAS NO POSTS
    </template>
  </div>
</template>

<script>
import PostCard from '@/components/PostCard';

export default {
  components: {
    PostCard,
  },
  props: {
    posts: {
      type: Array,
      default: null,
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.post.loading;
    },
  },
};
</script>
