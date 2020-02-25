<template>
  <ul>
    <li v-if="prevKey">
      <nuxt-link :to="`/shake/${shakeName}/before/${prevKey}`"
        >Previous</nuxt-link
      >
    </li>
    <li v-if="nextKey">
      <nuxt-link :to="`/shake/${shakeName}/after/${nextKey}`">Next</nuxt-link>
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
  },
};
</script>

<style lang="scss" scoped></style>
