<template>
  <ul>
    <li v-if="prevKey">
      <nuxt-link :to="prevLink">Previous</nuxt-link>
    </li>
    <li v-if="nextKey">
      <nuxt-link :to="nextLink">Next</nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    shakeUrl: {
      type: String,
      default: null,
    },
    shakeType: {
      type: String,
      default: null,
    },
    nextKey: {
      type: String,
      default: null,
    },
    prevKey: {
      type: String,
      default: null,
    },
    isUser: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    navUrl() {
      if (this.shakeUrl === '/friends') {
        return '';
      }
      if (this.shakeType === 'magic' || this.isUser) {
        return this.shakeUrl;
      }
      return `/shake${this.shakeUrl}`;
    },
    nextLink() {
      return `${this.navUrl}/after/${this.nextKey}`;
    },
    prevLink() {
      return `${this.navUrl}/before/${this.prevKey}`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
