<template>
  <div>
    <template v-if="shakes">
      <h2>Shakes</h2>
      <ol>
        <li v-for="shake in shakes" :key="shake.id">
          <nuxt-link :to="`/shake${shake.url}`">{{ shake.name }}</nuxt-link>
        </li>
      </ol>
      <h2>Shakes Array</h2>
      <pre>{{ JSON.stringify(shakes, undefined, 2) }}</pre>
    </template>
    <template v-else>
      SHAKE LIST SKELETON COMPONENT HERE
    </template>
  </div>
</template>

<script>
export default {
  props: {
    shakes: {
      type: Array,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped></style>
