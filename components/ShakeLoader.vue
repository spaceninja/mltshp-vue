<template>
  <AppAlert v-if="error" :error="error" />
  <ShakePage
    v-else
    :shake="shake"
    :page="page"
    :user="user"
    :is-root="isRoot"
    :is-user="isUser"
  />
</template>

<script>
import Shake from '@/models/Shake';
import Page from '@/models/Page';
import User from '@/models/User';
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
          .withAllRecursive()
          .first();
      }
      return null;
    },
    user() {
      return User.query()
        .where('name', this.shake && this.shake.owner && this.shake.owner.name)
        .withAll()
        .first();
    },
    title() {
      return this.shake && this.shake.name ? this.shake.name : this.shakeName;
    },
  },
  head() {
    return {
      title: this.title,
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
