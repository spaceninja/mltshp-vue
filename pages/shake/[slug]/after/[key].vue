<template>
  <div>
    <ShakePage
      v-if="shake && files"
      :shake="shake"
      :files="files.sharedfiles"
      :after="true"
    />
    <AppLoading v-else-if="shakePending || filesPending" />
    <AppError v-else-if="shakeError" :error="shakeError" />
    <AppError v-else-if="filesError" :error="filesError" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const {
  data: shake,
  pending: shakePending,
  error: shakeError,
} = await useFetch('/api/mltshp', {
  headers: useRequestHeaders(['cookie']) as HeadersInit,
  query: { path: `/api/shake_name/${route.params.slug}` },
});
const {
  data: files,
  pending: filesPending,
  error: filesError,
} = await useAsyncData(() =>
  $fetch('/api/mltshp', {
    headers: useRequestHeaders(['cookie']) as HeadersInit,
    query: { path: `/api/shakes/${shake.value.id}/after/${route.params.key}` },
  })
);

useHead({
  title: shake.value?.name,
});
</script>
