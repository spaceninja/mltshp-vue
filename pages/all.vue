<template>
  <div>
    <h1>All Posts</h1>
    <p>A list of all the posts. Use with caution.</p>
    <h2>All Posts</h2>
    <ol v-if="posts">
      <li v-for="post in posts" :key="post.sharekey">
        <nuxt-link :to="`/post/${post.sharekey}`">{{
          post.title || post.name
        }}</nuxt-link>
      </li>
    </ol>
    <h3>All Posts Array</h3>
    <pre>{{ JSON.stringify(posts, undefined, 2) }}</pre>
  </div>
</template>

<script>
import Post from '@/models/Post';

export default {
  computed: {
    posts() {
      return Post.all();
    },
  },
  head() {
    return {
      title: 'All Posts - MLTSHP in Vue',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'A list of all the posts. Use with caution.',
        },
      ],
    };
  },
};
</script>
