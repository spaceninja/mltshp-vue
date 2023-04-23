<template>
  <div>
    <ShakePage
      v-if="shake && files"
      :shake="shake"
      :files="files.sharedfiles"
    />
    <AppLoading v-else-if="shakePending || filesPending" />
    <AppError v-else-if="shakeError" :error="shakeError" />
    <AppError v-else-if="filesError" :error="filesError" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const headers = useRequestHeaders(['cookie']) as HeadersInit;
const {
  data: shake,
  pending: shakePending,
  error: shakeError,
} = await useFetch('/api/mltshp', {
  headers,
  query: { path: `/api/shake_name/${route.params.slug}` },
});
const {
  data: files,
  pending: filesPending,
  error: filesError,
} = await useLazyFetch('/api/mltshp', {
  headers,
  query: { path: `/api/shakes/${shake.value.id}` },
});
</script>
