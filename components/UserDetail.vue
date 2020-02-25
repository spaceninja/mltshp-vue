<template>
  <div>
    <h2>User Object</h2>
    <pre>{{ JSON.stringify(user, undefined, 2) }}</pre>
    <template v-if="!user">
      SKELETON COMPONENT HERE
    </template>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped></style>
