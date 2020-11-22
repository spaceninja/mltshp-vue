<template>
  <div v-if="id">
    <h2>User Object</h2>
    <pre>{{ JSON.stringify($props, undefined, 2) }}</pre>
  </div>
  <div v-else>USER DETAIL SKELETON COMPONENT HERE</div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    about: {
      type: String,
      default: null,
    },
    id: {
      type: Number,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    profileImageUrl: {
      type: String,
      default: null,
    },
    shakes: {
      type: Array,
      default: null,
    },
    website: {
      type: String,
      default: null,
    },
  },
};
</script>
