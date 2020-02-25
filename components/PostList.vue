<template>
  <div>
    <template v-if="posts">
      <h2>Posts</h2>
      <ol>
        <li v-for="post in posts" :key="post.sharekey">
          <nuxt-link :to="`/post/${post.sharekey}`">{{
            post.title || post.name
          }}</nuxt-link>
        </li>
      </ol>
      <h3>Posts Array</h3>
      <pre>{{ JSON.stringify(posts, undefined, 2) }}</pre>
    </template>
    <template v-else>
      POST LIST SKELETON COMPONENT HERE
    </template>
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
