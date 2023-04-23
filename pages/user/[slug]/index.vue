<template>
  <div>
    <h1>User: {{ route.params.slug }}</h1>
    <div v-if="user">
      <pre>{{ JSON.stringify(user, undefined, 2) }}</pre>
    </div>
    <AppLoading v-else-if="pending" />
    <AppError v-else-if="error" :error="error" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const {
  data: user,
  pending,
  error,
} = await useFetch('/api/mltshp', {
  headers: useRequestHeaders(['cookie']) as HeadersInit,
  query: { path: `/api/user_name/${route.params.slug}` },
});
</script>
