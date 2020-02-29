<template>
  <div>
    <button @click="toggleLike">
      {{ liked ? 'Unlike This' : 'Like This' }}
    </button>
    <span v-if="error">😭 That didn't work!</span>
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
          liked: !this.liked,
        })
        .catch(error => (this.error = error));
    },
  },
};
</script>

<style lang="scss" scoped></style>
