<template>
  <div>
    <h1>Settings</h1>
    <button @click="toggleNSFW">Toggle NSFW</button> {{ hideNSFW }}

    <select v-model="theme">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="synthwave">Synthwave</option>
    </select>

    <button @click="save">Save Settings</button>
  </div>
</template>

<script setup lang="ts">
const hideNSFW = useNSFW();
const theme = useTheme();
const themeCookie = useThemeCookie();
const layout = useLayout();
console.log('Hide NSFW?', hideNSFW.value);
console.log('Theme?', theme.value);
console.log('Layout?', layout.value);

const toggleNSFW = () => {
  hideNSFW.value = !hideNSFW.value;
};

const save = () => {
  themeCookie.value = theme.value;
};

useHead({
  title: 'Settings',
});
</script>
