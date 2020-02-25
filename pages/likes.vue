<template>
  <div>
    <h1>Likes</h1>
    <p>A list of the most recent posts you liked.</p>
    <div v-if="error" style="color:red">
      <strong>{{ error.name }}</strong> {{ error.message }}
    </div>
    <PostList :posts="posts" />
  </div>
</template>

<script>
import Post from '@/models/Post';
import PostList from '@/components/PostList';

export default {
  components: {
    PostList,
  },
  data() {
    return {
      error: null,
    };
  },
  computed: {
    posts() {
      return Post.query()
        .where('shake_ids', array => array.includes('likes'))
        .get();
    },
  },
  created() {
    this.$store
      .dispatch('post/fetchPosts', {
        endpoint: '/api/favorites',
        shakeId: 'likes',
      })
      .catch(error => (this.error = error));
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
