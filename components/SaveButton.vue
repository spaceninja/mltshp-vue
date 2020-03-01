<template>
  <div>
    <button :disabled="saved" @click="toggleSave">
      {{ saved ? `Saved to ${saveToName}` : `Save to ${saveToName}` }}
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
    shake: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      error: null,
    };
  },
  computed: {
    saveToName() {
      if (this.shake) {
        if (this.shake.type === 'user') return 'to Your Shake';
        return `to ${this.shake.name}`;
      }
      return null;
    },
  },
  methods: {
    toggleSave() {
      console.log(
        `Saved for ${this.sharekey} in ${this.shake && this.shake.id} is ${
          this.saved
        }`
      );
      this.$store
        .dispatch('post/toggleSave', {
          sharekey: this.sharekey,
          saved: !this.saved,
          shakeId: this.shake && this.shake.id,
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
