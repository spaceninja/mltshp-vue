<template>
  <div>
    <h1>Post Detail Page: {{ title }}</h1>
    <p>Details about this post.</p>
    <AppAlert v-if="error" :name="error.name" :message="error.message" />
    <template v-else>
      <PostDetail :post="post" />
      <CommentList :comments="comments" />
    </template>
  </div>
</template>

<script>
import Post from '@/models/Post';
import Comment from '@/models/Comment';
import AppAlert from '@/components/AppAlert';
import CommentList from '@/components/CommentList';
import PostDetail from '@/components/PostDetail';

export default {
  validate({ params }) {
    return params.key;
  },
  components: {
    AppAlert,
    CommentList,
    PostDetail,
  },
  data() {
    return {
      error: null,
    };
  },
  computed: {
    post() {
      return Post.query()
        .where('sharekey', this.$route.params.key)
        .withAll()
        .first();
    },
    comments() {
      return Comment.query()
        .where('post_id', this.$route.params.key)
        .with('user')
        .get();
    },
    title() {
      if (this.post && this.post.title) {
        return this.post.title;
      }
      if (this.post && this.post.name) {
        return this.post.name;
      }
      return this.$route.params.id;
    },
  },
  created() {
    this.$store
      .dispatch('post/fetchPost', this.$route.params.key)
      .catch(error => (this.error = error));
    this.$store
      .dispatch('comment/fetchComments', this.$route.params.key)
      .catch(error => (this.error = error));
  },
  head() {
    return {
      title: `${this.title} - MLTSHP in Vue`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            this.post && this.post.description ? this.post.description : null,
        },
        {
          hid: 'canonical',
          property: 'canonical',
          href:
            this.post && this.post.permalink_page
              ? this.post.permalink_page
              : null,
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'MLTSHP in Vue',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            this.post && this.post.description ? this.post.description : null,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            this.post && this.post.original_image_url
              ? this.post.original_image_url
              : null,
        },
        {
          hid: 'og:image:width',
          property: 'og:image:width',
          content: this.post && this.post.width ? this.post.width : null,
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: this.post && this.post.height ? this.post.height : null,
        },
        {
          hid: 'twitter:url',
          property: 'twitter:url',
          content:
            this.post && this.post.permalink_page
              ? this.post.permalink_page
              : null,
        },
        {
          hid: 'twitter:site',
          property: 'twitter:site',
          content: '@mltshphq',
        },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: 'photo',
        },
      ],
    };
  },
};
</script>
