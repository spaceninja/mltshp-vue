<template>
  <div>
    <h1>Settings</h1>
    <div>
      <input id="disable-nsfw" v-model="disableNSFW" type="checkbox" />
      <label for="disable-nsfw">Disable NSFW Filter?</label>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    disableNSFW: {
      set(val) {
        this.$auth.$storage.setUniversal('disableNSFW', val);
      },
      get() {
        return this.$auth.$storage.getUniversal('disableNSFW');
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
