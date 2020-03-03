<template>
  <div>
    <button
      :disabled="liked"
      :aria-describedby="error ? 'like-button-error' : null"
      @click="toggleLike"
    >
      {{ liked ? 'Liked!' : 'Like This' }}
    </button>
    <span v-if="error" id="like-button-error" class="error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  props: {
    sharekey: {
      type: String,
      required: true,
    },
    liked: {
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
    toggleLike() {
      console.log(
        `Liked for ${this.sharekey} is ${this.liked}, set to ${!this.liked}`
      );
      this.$store
        .dispatch('post/toggleLike', {
          sharekey: this.sharekey,
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
