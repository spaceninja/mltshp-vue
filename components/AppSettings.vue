<template>
  <div>
    <h1>Settings</h1>

    <p>
      <input
        id="hide-nsfw"
        v-model="hideNSFW"
        type="checkbox"
        @change="setNSFW"
      />
      <label for="hide-nsfw">Hide NSFW Content?</label>
    </p>

    <p>
      <label for="layout">Layout</label>
      <select id="layout" v-model="layout">
        <option value="classic">Classic</option>
        <option value="grid">Grid</option>
      </select>
    </p>

    <p>
      <label for="theme">Theme</label>
      <select id="theme" v-model="theme">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="synthwave">Synthwave</option>
      </select>
    </p>

    <p>
      <button @click="save">Save Settings</button>
    </p>
  </div>
</template>

<script setup lang="ts">
const hideNSFW = useNSFW();
const layout = useLayout();
const layoutCookie = useLayoutCookie();
const theme = useTheme();
const themeCookie = useThemeCookie();

const setNSFW = (event: Event) => {
  const target = event.target as HTMLInputElement;
  hideNSFW.value = target.checked;
};

const save = () => {
  layoutCookie.value = layout.value;
  themeCookie.value = theme.value;
};
</script>
