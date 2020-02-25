<template>
  <div>
    <template v-if="post">
      <h2>Post Object</h2>
      <pre>{{ JSON.stringify(post, undefined, 2) }}</pre>
    </template>
    <template v-else>
      POST DETAIL SKELETON COMPONENT HERE
    </template>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped></style>
