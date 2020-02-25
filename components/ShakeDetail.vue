<template>
  <div>
    <h2>Shake Object</h2>
    <pre>{{ JSON.stringify(shake, undefined, 2) }}</pre>
    <template v-if="!shake">
      SKELETON COMPONENT HERE
    </template>
  </div>
</template>

<script>
export default {
  props: {
    shake: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped></style>
