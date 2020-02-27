<template>
  <div>
    <template v-if="shakes">
      <h3>{{ userName }}'s Other Shakes</h3>
      <ol>
        <li v-for="shake in shakes" :key="shake.id">
          <nuxt-link
            :to="`${shake.type === 'user' ? '' : '/shake'}${shake.url}`"
            >{{ shake.name }}</nuxt-link
          >
        </li>
      </ol>
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
    userName: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped></style>
