<template>
  <div>
    <ShakePage
      v-if="user && files"
      :user="user"
      :shake="userShake"
      :files="files.sharedfiles"
    />
    <AppLoading v-else-if="userPending || filesPending" />
    <AppError v-else-if="userError" :error="userError" />
    <AppError v-else-if="filesError" :error="filesError" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const {
  data: user,
  pending: userPending,
  error: userError,
} = await useFetch('/api/mltshp', {
  headers: useRequestHeaders(['cookie']) as HeadersInit,
  query: { path: `/api/user_name/${route.params.slug}` },
});
const {
  data: files,
  pending: filesPending,
  error: filesError,
} = await useAsyncData(() =>
  $fetch('/api/mltshp', {
    headers: useRequestHeaders(['cookie']) as HeadersInit,
    query: { path: `/api/shakes/${user.value.shakes[0].id}` },
  })
);
const userShake = computed(() => ({
  ...user.value?.shakes[0],
  description: user.value?.about,
}));

useHead({
  title: userShake.value?.name,
});
</script>
