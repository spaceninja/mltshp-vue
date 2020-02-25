<template>
  <div>
    <h1>Incoming!</h1>
    <p>A list of the most recent posts.</p>
    <AppAlert v-if="error" :name="error.name" :message="error.message" />
    <PostList v-else :posts="posts" />
  </div>
</template>

<script>
import Post from '@/models/Post';
import PostList from '@/components/PostList';
import AppAlert from '@/components/AppAlert';

export default {
  components: {
    AppAlert,
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
        .where('shake_ids', array => array.includes('incoming'))
        .get();
    },
  },
  created() {
    this.$store
      .dispatch('post/fetchPosts', {
        endpoint: '/api/incoming',
        shakeId: 'incoming',
      })
      .catch(error => (this.error = error));
  },
  head() {
    return {
      title: 'Incoming! - MLTSHP in Vue',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'A list of the most recent posts.',
        },
      ],
    };
  },
};
</script>
