<template>
  <div>
    <p>You should see this page without need to authentication!</p>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  options: {
    auth: false
  }
}
</script>
