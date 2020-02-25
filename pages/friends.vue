<template>
  <div>
    <h1>Friends</h1>
    <p>A list of the most recent posts by users you follow.</p>
    <p>Note: On MLTSHP.com, this is the homepage</p>
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
        .where('shake_ids', array => array.includes('friends'))
        .get();
    },
  },
  created() {
    this.$store
      .dispatch('post/fetchPosts', {
        endpoint: '/api/friends',
        shakeId: 'friends',
      })
      .catch(error => (this.error = error));
  },
  head() {
    return {
      title: 'Friends Shake - MLTSHP in Vue',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'A list of the most recent posts by users you follow.',
        },
      ],
    };
  },
};
</script>
