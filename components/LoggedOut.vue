<template>
  <div>
    <h1>You are logged out!</h1>
    <button
      type="button"
      class="button--green"
      @click="$auth.loginWith('mltshp')"
    >
      Log In with MLTSHP
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
