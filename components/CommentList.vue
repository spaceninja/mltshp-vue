<template>
  <div>
    <template v-if="comments">
      <h3>Comments Array</h3>
      <pre>{{ JSON.stringify(comments, undefined, 2) }}</pre>
    </template>
    <template v-else>
      COMMENT LIST SKELETON COMPONENT HERE
    </template>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped></style>
