<template>
  <div>
    <h1>Shake List Page: {{ $route.params.id }}</h1>
    <p>A list of the most recent posts from this shake.</p>
    <img v-if="isLoading" src="/images/loading-mltshp.gif" alt="Loading…" />
    <pre>{{ JSON.stringify(shake, undefined, 2) }}</pre>
    <!-- TODO: add error state for if shake doesn't exist because we can't load it -->
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
    isLoading() {
      return this.$store.state.loading;
    },
  },
  created() {
    this.$store.dispatch('shake/fetchShake', this.$route.params.id);
  },
};
</script>
