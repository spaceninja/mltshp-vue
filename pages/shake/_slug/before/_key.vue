<template>
  <div>
    <h1>SHAKE {{ $route.params.slug }} BEFORE {{ $route.params.key }}</h1>
    <h1>Shake List Page: {{ shake && shake.name }}</h1>
    <p>A list of the previous 10 posts from this shake.</p>
    <AppAlert v-if="error" :name="error.name" :message="error.message" />
    <template v-else>
      <ShakeDetail :shake="shake" />
      <PostList :posts="posts" />
      <h3>Page Info</h3>
      <pre>{{ JSON.stringify(pages, undefined, 2) }}</pre>
    </template>
  </div>
</template>

<script>
import Shake from '@/models/Shake';
import Post from '@/models/Post';
import Page from '@/models/Page';
import AppAlert from '@/components/AppAlert';
import PostList from '@/components/PostList';
import ShakeDetail from '@/components/ShakeDetail';

export default {
  validate({ params }) {
    return params.key;
  },
  components: {
    AppAlert,
    PostList,
    ShakeDetail,
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
        .where('shake_ids', array =>
          array.includes(this.shake && this.shake.id)
        )
        .get();
    },
    pages() {
      return Page.query()
        .where('shake_id', this.shake && this.shake.id)
        .withAll()
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
            endpoint: `/api/shakes/${this.shake.id}/before/${this.$route.params.key}`,
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
