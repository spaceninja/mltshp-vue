<template>
  <div>
    <h1>Shake: {{ route.params.slug }}</h1>
    <div v-if="shake">
      <pre>{{ JSON.stringify(shake, undefined, 2) }}</pre>
    </div>
    <AppLoading v-else-if="pending" />
    <AppError v-else-if="error" :error="error" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const headers = useRequestHeaders(['cookie']) as HeadersInit;
const {
  data: shake,
  pending,
  error,
} = await useFetch('/api/mltshp', {
  headers,
  query: { path: `/api/shake_name/${route.params.slug}` },
});
</script>
