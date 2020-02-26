<template>
  <AppAlert v-if="error" :name="error.name" :message="error.message" />
  <ShakePage
    v-else
    :shake="shake"
    :page="page"
    :is-root="isRoot"
    :is-user="isUser"
  />
</template>

<script>
import Shake from '@/models/Shake';
import Page from '@/models/Page';
import AppAlert from '@/components/AppAlert';
import ShakePage from '@/components/ShakePage';

export default {
  components: {
    AppAlert,
    ShakePage,
  },
  props: {
    shakeName: {
      type: String,
      required: true,
    },
    beforeKey: {
      type: String,
      default: null,
    },
    afterKey: {
      type: String,
      default: null,
    },
    isUser: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      error: null,
    };
  },
  computed: {
    isRoot() {
      return !this.beforeKey && !this.afterKey;
    },
    shakeEndpoint() {
      if (this.isUser) {
        return `/api/shake_user/${this.shakeName}`;
      }
      return `/api/shake_name/${this.shakeName}`;
    },
    postsEndpoint() {
      let apiPrefix = '/api/shakes';
      if (this.shake.type === 'magic') {
        apiPrefix = '/api';
      }
      if (this.beforeKey) {
        return `${apiPrefix}/${this.shake.id}/before/${this.$route.params.key}`;
      }
      if (this.afterKey) {
        return `${apiPrefix}/${this.shake.id}/after/${this.$route.params.key}`;
      }
      return `${apiPrefix}/${this.shake.id}`;
    },
    shake() {
      const shakeUrl = this.isUser
        ? `/user/${this.shakeName}`
        : `/${this.shakeName}`;
      return Shake.query()
        .where('url', shakeUrl)
        .withAll()
        .first();
    },
    page() {
      if (this.shake && this.shake.id) {
        let pageId = `${this.shake.id}-root`;
        if (this.beforeKey) {
          pageId = `${this.shake.id}-before-${this.beforeKey}`;
        }
        if (this.afterKey) {
          pageId = `${this.shake.id}-after-${this.afterKey}`;
        }
        return Page.query()
          .whereId(pageId)
          .withAll()
          .first();
      }
      return null;
    },
  },
  created() {
    this.$store
      .dispatch('shake/fetchShake', {
        endpoint: this.shakeEndpoint,
        shakeName: this.shakeName,
      })
      .then(data => {
        console.log('LOAD SHAKE THEN LOAD POSTS FOR SHAKE', this.shake.id);
        this.$store
          .dispatch('post/fetchPosts', {
            endpoint: this.postsEndpoint,
            shakeId: this.shake.id,
            beforeKey: this.beforeKey,
            afterKey: this.afterKey,
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
