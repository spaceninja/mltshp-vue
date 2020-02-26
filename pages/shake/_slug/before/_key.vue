<template>
  <div>
    <h1>SHAKE {{ $route.params.slug }} BEFORE {{ $route.params.key }}</h1>
    <h1>Shake List Page: {{ shake && shake.name }}</h1>
    <p>A list of the previous 10 posts from this shake.</p>
    <AppAlert v-if="error" :name="error.name" :message="error.message" />
    <ShakePage v-else :shake="shake" :page="page" />
  </div>
</template>

<script>
import Shake from '@/models/Shake';
import Page from '@/models/Page';
import AppAlert from '@/components/AppAlert';
import ShakePage from '@/components/ShakePage';

export default {
  validate({ params }) {
    return params.key;
  },
  components: {
    AppAlert,
    ShakePage,
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
    page() {
      return Page.query()
        .whereId(
          `${this.shake && this.shake.id}-before-${this.$route.params.key}`
        )
        .withAll()
        .first();
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
            beforeKey: this.$route.params.key,
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
