<template>
  <div>
    <ShakePage
      v-if="data"
      :shake="magicShakes.incoming"
      :files="data.incoming"
    />
    <AppLoading v-else-if="pending" />
    <AppError v-else-if="error" :error="error" />
  </div>
</template>

<script setup lang="ts">
const { data, pending, error } = await useFetch('/api/mltshp', {
  headers: useRequestHeaders(['cookie']) as HeadersInit,
  query: { path: `/api/incoming` },
});
</script>
