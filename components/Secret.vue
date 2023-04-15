<script lang="ts">
export default {
  props: {
    protectionType: String,
    href: String,
  },
};
</script>

<template>
  <div>
    <h1>I'm a secret!</h1>
    <h3>
      My protection works via an
      <a :href="href" target="_blank">{{ protectionType }} middleware</a>.
    </h3>
  </div>
</template>
