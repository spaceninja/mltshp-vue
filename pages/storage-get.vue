<template>
  <div>
    <div>Get Data: {{ resData.text }}</div>
  </div>
</template>

<script setup lang="ts">
const { data: resData } = await useFetch('/api/test');
</script>
