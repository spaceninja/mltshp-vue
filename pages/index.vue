<template>
  <div>
    <ShakePage
      v-if="data"
      :shake="systemShakes.friends"
      :files="data.friend_shake"
    />
    <AppLoading v-else-if="pending" />
    <AppError v-else-if="error" :error="error" />
  </div>
</template>

<script setup lang="ts">
const { data, pending, error } = await useFetch('/api/mltshp', {
  headers: useRequestHeaders(['cookie']) as HeadersInit,
  query: { path: `/api/friends` },
});

useHead({
  title: systemShakes.friends.name,
});
</script>
