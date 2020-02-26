<template>
  <div>
    <template v-if="sharekey">
      <h2>Post Object</h2>
      <pre>{{ JSON.stringify($props, undefined, 2) }}</pre>
    </template>
    <template v-else>
      POST DETAIL SKELETON COMPONENT HERE
    </template>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    commentCount: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    liked: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: Number,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    nsfw: {
      type: Boolean,
      default: false,
    },
    originalImageUrl: {
      type: String,
      default: null,
    },
    permalinkPage: {
      type: String,
      default: null,
    },
    pivotId: {
      type: String,
      default: null,
    },
    postedAt: {
      type: String,
      default: null,
    },
    saved: {
      type: Boolean,
      default: false,
    },
    saves: {
      type: Number,
      default: null,
    },
    shakes: {
      type: Array,
      default: null,
    },
    sharekey: {
      type: String,
      default: null,
    },
    sourceUrl: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    user: {
      type: Object,
      default: null,
    },
    views: {
      type: Number,
      default: null,
    },
    width: {
      type: Number,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped></style>
