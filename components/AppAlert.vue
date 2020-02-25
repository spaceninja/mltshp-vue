<template>
  <div class="alert">
    <strong v-if="name">{{ name }}</strong> {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.alert {
  background: pink;
  color: red;
}
</style>
