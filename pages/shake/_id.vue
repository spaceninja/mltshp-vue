<template>
  <div>
    <h1>Shake List Page: {{ $route.params.id }}</h1>
    <p>A list of the most recent posts from this shake.</p>
    <img v-if="isLoading" src="/images/loading-mltshp.gif" alt="Loading…" />
    <h2>Shake Object</h2>
    <pre>{{ JSON.stringify(shake, undefined, 2) }}</pre>
    <h3>Shake User Object</h3>
    <pre>{{ JSON.stringify(shakeUser, undefined, 2) }}</pre>
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return params.id;
  },
  computed: {
    ShakeModel() {
      return this.$store.$db().model('shakes');
    },
    shake() {
      return this.ShakeModel.query()
        .withAll()
        .whereId(Number(this.$route.params.id))
        .first();
    },
    UserModel() {
      return this.$store.$db().model('users');
    },
    shakeUser() {
      if (this.shake && this.shake.user) {
        console.log('FOUND USER IN SHAKE');
        return this.shake.user;
      }

      if (this.shake && this.shake.user_id) {
        console.log('FOUND USER ID IN SHAKE');
        return this.UserModel.query()
          .whereId(this.shake.user_id)
          .with('shakes')
          .first();
      }

      console.error('NO USER OR USER ID');
      return null;
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
