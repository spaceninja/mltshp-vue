<template>
  <div>
    <h1>Post Detail Page {{ $route.params.key }}</h1>
    <p>Details about this post.</p>
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return params.key;
  },
};
</script>
