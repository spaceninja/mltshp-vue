<template>
  <div>
    <h2>User Shakes</h2>
    <ol v-if="user && user.shakes">
      <li v-for="shake in user.shakes" :key="shake.id">
        <nuxt-link :to="`/shake${shake.url}`">{{ shake.name }}</nuxt-link>
      </li>
    </ol>
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
