<template>
  <div>
    <h1>Shake List Page: {{ $route.params.id }}</h1>
    <p>A list of the most recent posts from this shake.</p>
    <img v-if="isLoading" src="/images/loading-mltshp.gif" alt="Loading…" />
    <div v-if="!isLoading && !shake">
      <!-- TODO: Why is this visible on page load? -->
      <h1 style="color:red">Shake Not Found</h1>
      <p>
        Unfortunately, there's no API endpoint for shakes, so you can only
        access a shake after first accessing the user page.
      </p>
    </div>
    <h2>Shake Object</h2>
    <pre>{{ JSON.stringify(shake, undefined, 2) }}</pre>
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return params.id;
  },
  computed: {
    shake() {
      return this.$store.getters['shake/getShakeById'](this.$route.params.id);
    },
    user() {
      return 'Bill';
    },
    isLoading() {
      return this.$store.state.loading;
    },
  },
  created() {
    this.$store.dispatch('shake/fetchShake', this.$route.params.id);
  },
};
</script>
