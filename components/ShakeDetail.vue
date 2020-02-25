<template>
  <div>
    <template v-if="shake">
      <h2>Shake Object</h2>
      <pre>{{ JSON.stringify(shake, undefined, 2) }}</pre>
    </template>
    <template v-else>
      SHAKE DETAIL SKELETON COMPONENT HERE
    </template>
  </div>
</template>

<script>
export default {
  props: {
    // TODO: v-bind shake and define props here
    shake: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped></style>
