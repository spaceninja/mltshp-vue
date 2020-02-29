<template>
  <div>
    <button :disabled="saved" @click="toggleSave">
      {{ saved ? 'Saved!' : 'Save This' }}
    </button>
    <span v-if="error" class="error">😭 {{ error }}</span>
  </div>
</template>

<script>
export default {
  props: {
    sharekey: {
      type: String,
      required: true,
    },
    saved: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      error: null,
    };
  },
  methods: {
    toggleSave() {
      console.log(
        `Saved for ${this.sharekey} is ${this.saved}, set to ${!this.saved}`
      );
      this.$store
        .dispatch('post/toggleSave', {
          sharekey: this.sharekey,
          saved: !this.saved,
        })
        .catch(error => (this.error = error));
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  color: red;
}
</style>
