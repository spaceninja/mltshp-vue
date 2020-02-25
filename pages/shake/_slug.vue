<template>
  <div>
    <h1>Shake List Page: {{ shake && shake.name }}</h1>
    <p>A list of the most recent posts from this shake.</p>
    <div v-if="error" style="color:red">
      <strong>{{ error.name }}</strong> {{ error.message }}
    </div>
    <h2>Shake Object</h2>
    <pre>{{ JSON.stringify(shake, undefined, 2) }}</pre>
    <PostList :posts="posts" />
  </div>
</template>

<script>
import Shake from '@/models/Shake';
import Post from '@/models/Post';
import PostList from '@/components/PostList';

export default {
  validate({ params }) {
    return params.slug;
  },
  components: {
    PostList,
  },
  data() {
    return {
      error: null,
    };
  },
  computed: {
    shake() {
      return Shake.query()
        .where('url', `/${this.$route.params.slug}`)
        .withAll()
        .first();
    },
    posts() {
      return Post.query()
        .where('shake_ids', array => array.includes(this.shake.id))
        .get();
    },
  },
  created() {
    this.$store
      .dispatch(
        'shake/fetchShake',
        `/api/shake_name/${this.$route.params.slug}`
      )
      .then(data => {
        console.log('LOAD SHAKE THEN LOAD POSTS FOR SHAKE', this.shake.id);
        this.$store
          .dispatch('post/fetchPosts', {
            endpoint: `/api/shakes/${this.shake.id}`,
            shakeId: this.shake.id,
          })
          .catch(error => (this.error = error));
      })
      .catch(error => (this.error = error));
  },
  head() {
    return {
      title: `${
        this.shake && this.shake.name
          ? this.shake.name
          : this.$route.params.slug
      } - MLTSHP in Vue`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            this.shake && this.shake.description
              ? this.shake.description
              : null,
        },
      ],
    };
  },
};
</script>
