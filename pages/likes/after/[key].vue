<template>
  <div>
    <ShakePage
      v-if="data"
      :shake="magicShakes.likes"
      :files="data.favorites"
      :after="true"
    />
    <AppLoading v-else-if="pending" />
    <AppError v-else-if="error" :error="error" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { data, pending, error } = await useLazyFetch('/api/mltshp', {
  headers: useRequestHeaders(['cookie']) as HeadersInit,
  query: { path: `/api/favorites/after/${route.params.key}` },
});

useHead({
  title: magicShakes.likes.name,
});
</script>
