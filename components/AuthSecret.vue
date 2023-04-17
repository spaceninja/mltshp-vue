<script lang="ts">
export default {
  props: {
    protectionType: { type: String, required: true },
    href: { type: String, required: true },
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
