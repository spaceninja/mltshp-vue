<template>
  <div>
    <h2>Posts</h2>
    <ol v-if="posts">
      <li v-for="post in posts" :key="post.sharekey">
        <nuxt-link :to="`/post/${post.sharekey}`">{{
          post.title || post.name
        }}</nuxt-link>
      </li>
    </ol>
    <template v-if="posts.length < 1">
      SKELETON COMPONENT HERE
    </template>
    <h3>Posts Array</h3>
    <pre>{{ JSON.stringify(posts, undefined, 2) }}</pre>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped></style>
