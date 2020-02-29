<template>
  <div class="alert"><strong>Error:</strong> {{ message }}</div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-prop-types
    error: {
      required: true,
    },
  },
  computed: {
    message() {
      console.log(this.error, typeof this.error, this.error instanceof Error);
      if (typeof this.error === 'string') return this.error;
      if (this.error instanceof Error) return this.error.message;
      return 'Something went wrong!';
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
