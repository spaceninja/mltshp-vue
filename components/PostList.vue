<template>
  <div>
    <template v-if="posts && posts.length > 0">
      <h2>Posts</h2>
      <ol>
        <li v-for="post in posts" :key="post.sharekey">
          <nuxt-link :to="`/post/${post.sharekey}`">{{
            post.title || post.name
          }}</nuxt-link>
        </li>
      </ol>
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
