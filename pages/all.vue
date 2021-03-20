<template>
  <div>
    <h1>All Posts</h1>
    <p>A list of all the posts in the Vuex store. Use with caution.</p>
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
  head() {
    return {
      title: 'All Posts',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'A list of all the posts. Use with caution.',
        },
      ],
    };
  },
  computed: {
    posts() {
      return Post.all();
    },
  },
};
</script>
