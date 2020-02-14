<template>
  <div>
    <h1>User Detail Page: {{ $route.params.slug }}</h1>
    <p>Details about this user.</p>
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return params.slug;
  },
};
</script>
