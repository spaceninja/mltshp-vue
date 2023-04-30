<template>
  <div>
    <ShakePage
      v-if="data"
      :shake="systemShakes.likes"
      :files="data.favorites"
      :before="true"
    />
    <AppLoading v-else-if="pending" />
    <AppError v-else-if="error" :error="error" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { data, pending, error } = await useLazyFetch('/api/mltshp', {
  headers: useRequestHeaders(['cookie']) as HeadersInit,
  query: { path: `/api/favorites/before/${route.params.key}` },
});

useHead({
  title: systemShakes.likes.name,
});
</script>
