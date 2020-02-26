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
    shakeName: {
      type: String,
      required: true,
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
    nextLink() {
      if (this.isUser) {
        return `/shake/user/${this.shakeName}/after/${this.nextKey}`;
      }
      return `/shake/${this.shakeName}/after/${this.nextKey}`;
    },
    prevLink() {
      if (this.isUser) {
        return `/shake/user/${this.shakeName}/before/${this.prevKey}`;
      }
      return `/shake/${this.shakeName}/before/${this.prevKey}`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
