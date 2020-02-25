<template>
  <div>
    <template v-if="user">
      <ShakeList :shakes="user.shakes" />
      <h2>User Object</h2>
      <pre>{{ JSON.stringify(user, undefined, 2) }}</pre>
    </template>
    <template v-else>
      USER DETAIL SKELETON COMPONENT HERE
    </template>
  </div>
</template>

<script>
import ShakeList from '@/components/ShakeList';

export default {
  components: {
    ShakeList,
  },
  props: {
    // TODO: v-bind user and define props here
    user: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped></style>
