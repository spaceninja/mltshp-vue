<template>
  <div>
    <ShakePage
      v-if="user && files"
      :user="user"
      :shake="userShake"
      :files="files"
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
const files = ref([]);
const filesPending = ref(false);
const filesError: any | null = ref(null);
if (user.value) {
  console.log('USER ID', user.value.shakes[0].id);
  const { data, pending, error } = await useLazyFetch('/api/mltshp', {
    headers: useRequestHeaders(['cookie']) as HeadersInit,
    query: { path: `/api/shakes/${user.value.shakes[0].id}` },
  });
  files.value = data.value.sharedfiles;
  filesPending.value = pending.value;
  filesError.value = error.value;
}
const userShake = computed(() => ({
  ...user.value.shakes[0],
  description: user.value.about,
}));
</script>
