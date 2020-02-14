<template>
  <div>
    <h1>Shake List Page: {{ $route.params.id }}</h1>
    <p>A list of the most recent posts from this shake.</p>
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return params.id;
  },
};
</script>
