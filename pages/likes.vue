<template>
  <div>
    <h1>Likes</h1>
    <p>A list of the most recent posts you liked.</p>
    <img v-if="isLoading" src="/images/loading-mltshp.gif" alt="Loading…" />
    <h2>Liked Posts</h2>
    <ol v-if="posts">
      <li v-for="post in posts" :key="post.sharekey">
        <nuxt-link :to="`/post/${post.sharekey}`">{{
          post.title || post.name
        }}</nuxt-link>
      </li>
    </ol>
    <h3>Liked Posts Array</h3>
    <pre>{{ JSON.stringify(posts, undefined, 2) }}</pre>
  </div>
</template>

<script>
import Post from '@/models/Post';

export default {
  computed: {
    posts() {
      return Post.query()
        .where('shake_ids', array => array.includes('likes'))
        .get();
    },
    isLoading() {
      return this.$store.state.post.loading;
    },
  },
  created() {
    this.$store.dispatch('post/fetchPosts', {
      endpoint: '/api/favorites',
      shakeId: 'likes',
    });
  },
  head() {
    return {
      title: 'Your Likes - MLTSHP in Vue',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'A list of the most recent posts you liked.',
        },
      ],
    };
  },
};
</script>
