<template>
  <div>
    <h1>{{ statusCode }} {{ message }}</h1>
    <p v-if="statusCode === 404">
      <NuxtLink to="/">Go Home</NuxtLink>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500;
    },
    message() {
      return this.error.message || '<%= messages.client_error %>';
    },
  },
  head() {
    return {
      title: this.message,
    };
  },
};
</script>
