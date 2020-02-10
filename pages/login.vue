<template>
  <div>
    <p>You have to log in!</p>
    <button type="button" @click="$auth.loginWith('mltshp')">LOGIN</button>
  </div>
</template>

<script>
export default {
  middleware: ['auth']
}
</script>
