<template>
  <div>
    <ShakePage
      v-if="data"
      :shake="magicShakes.incoming"
      :files="data.incoming"
      :after="true"
    />
    <AppLoading v-else-if="pending" />
    <AppError v-else-if="error" :error="error" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const headers = useRequestHeaders(['cookie']) as HeadersInit;
const { data, pending, error } = await useFetch('/api/mltshp', {
  headers,
  query: { path: `/api/incoming/after/${route.params.key}` },
});
</script>
