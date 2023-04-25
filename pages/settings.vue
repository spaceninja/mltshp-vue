<template>
  <div>
    <h1>Settings</h1>
    <button @click="toggleNSFW">Toggle NSFW</button> {{ hideNSFW }}
  </div>
</template>

<script setup lang="ts">
const hideNSFW = useNSFW();
const theme = useTheme();
const layout = useLayout();
console.log('Hide NSFW?', hideNSFW.value);
console.log('Theme?', theme.value);
console.log('Layout?', layout.value);

const toggleNSFW = () => {
  hideNSFW.value = !hideNSFW.value;
};

useHead({
  title: 'Settings',
});
</script>
