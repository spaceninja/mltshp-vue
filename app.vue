<template>
  <div>
    <AppHeader />
    <hr />
    <main>
      <NuxtPage />
    </main>
    <hr />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const theme = useTheme();

useHead({
  titleTemplate: (titleChunk) =>
    titleChunk ? `${titleChunk} - MLTSHP in Vue` : 'MLTSHP in Vue',
  meta: [
    {
      name: 'description',
      content:
        'Easily save images from everywhere on the web. ' +
        'The silly ones, the sweet ones. The cool ones. The gross ones. ' +
        'Then share them with your friends and family.',
    },
  ],
  link: [
    {
      rel: 'icon',
      href:
        process.env.NODE_ENV === 'production'
          ? '/favicon.ico'
          : '/favicon-dev.ico',
    },
  ],
  htmlAttrs: {
    lang: 'en-US',
  },
  bodyAttrs: {
    class: () => `t-${theme.value}`,
  },
});
</script>
