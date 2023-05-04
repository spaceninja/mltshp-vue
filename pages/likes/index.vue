<template>
  <div>
    <ShakePage
      v-if="data"
      :shake="systemShakes.likes"
      :files="data.favorites"
    />
    <AppLoading v-else-if="pending" />
    <AppError v-else-if="error" :error="error" />
  </div>
</template>

<script setup lang="ts">
const { data, pending, error } = await useLazyFetch('/api/mltshp', {
  headers: useRequestHeaders(['cookie']) as HeadersInit,
  query: { path: `/api/favorites` },
});

useHead({
  title: systemShakes.likes.name,
});
</script>
