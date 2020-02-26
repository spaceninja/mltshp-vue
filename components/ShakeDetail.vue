<template>
  <div>
    <template v-if="id">
      <h2>Shake Object</h2>
      <pre>{{ JSON.stringify($props, undefined, 2) }}</pre>
    </template>
    <template v-else>
      SHAKE DETAIL SKELETON COMPONENT HERE
    </template>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    createdAt: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    id: {
      type: [String, Number],
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    owner: {
      type: Object,
      default: null,
    },
    thumbnailUrl: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    updatedAt: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped></style>
