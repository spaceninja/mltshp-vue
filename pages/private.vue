<template>
  <div>
    <h1>This page is private!</h1>
  </div>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>
