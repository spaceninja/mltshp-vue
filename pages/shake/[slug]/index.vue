<template>
  <div>
    <ShakePage v-if="shake && files" :shake="shake" :files="files" />
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
const files = ref([]);
const filesPending = ref(false);
const filesError: any | null = ref(null);
if (shake.value) {
  const { data, pending, error } = await useLazyFetch('/api/mltshp', {
    headers: useRequestHeaders(['cookie']) as HeadersInit,
    query: { path: `/api/shakes/${shake.value.id}` },
  });
  files.value = data.value.sharedfiles ?? [];
  filesPending.value = pending.value;
  filesError.value = error.value;
}
</script>
