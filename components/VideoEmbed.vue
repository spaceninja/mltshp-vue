<template>
  <div>
    <h1>TESTING</h1>
    <!-- eslint-disable vue/no-v-html -->
    <div
      v-if="iframe && iframe.html"
      :style="{
        '--aspect-ratio': iframe.height / iframe.width,
      }"
      v-html="iframeLazy"
    />
    <AppLoading v-else-if="pending" />
    <AppError v-else-if="error" :error="error" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  url: string;
}>();

const {
  data: iframe,
  pending,
  error,
} = await useFetch('/api/oembed', {
  query: { url: props.url },
});

const iframeLazy = computed(() =>
  iframe.value.html.replace(/<iframe/gi, '<iframe loading="lazy"')
);
</script>
