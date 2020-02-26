<template>
  <div>
    <h1>Shake List Page: {{ shake && shake.name }}</h1>
    <p>A list of the most recent posts from this shake.</p>
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
  },
  data() {
    return {
      error: null,
    };
  },
  computed: {
    endpoint() {
      if (this.beforeKey) {
        return `/api/shakes/${this.shake.id}/before/${this.$route.params.key}`;
      }
      if (this.afterKey) {
        return `/api/shakes/${this.shake.id}/before/${this.$route.params.key}`;
      }
      return `/api/shakes/${this.shake.id}`;
    },
    shake() {
      return Shake.query()
        .where('url', `/${this.shakeName}`)
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
      .dispatch('shake/fetchShake', `/api/shake_name/${this.shakeName}`)
      .then(data => {
        console.log('LOAD SHAKE THEN LOAD POSTS FOR SHAKE', this.shake.id);
        this.$store
          .dispatch('post/fetchPosts', {
            endpoint: this.endpoint,
            shakeId: this.shake.id,
            beforeKey: this.beforeKey,
            afterKey: this.afterKey,
          })
          .catch(error => (this.error = error));
      })
      .catch(error => (this.error = error));
  },
};
</script>
