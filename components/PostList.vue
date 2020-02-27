<template>
  <div>
    <template v-if="posts && posts.length > 0">
      <h2>Posts</h2>
      <ol>
        <li v-for="post in posts" :key="post.sharekey">
          <PostCard v-bind="post" />
        </li>
      </ol>
    </template>
    <template v-else>
      POST LIST SKELETON COMPONENT HERE
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
};
</script>

<style lang="scss" scoped></style>
