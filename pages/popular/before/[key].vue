<template>
  <div>
    <ShakePage
      v-if="data"
      :shake="magicShakes.popular"
      :files="data.magicfiles"
      :before="true"
    />
    <AppLoading v-else-if="pending" />
    <AppError v-else-if="error" :error="error" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { data, pending, error } = await useFetch('/api/mltshp', {
  headers: useRequestHeaders(['cookie']) as HeadersInit,
  query: { path: `/api/magicfiles/before/${route.params.key}` },
});

useHead({
  title: magicShakes.popular.name,
});
</script>
