<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <label for="comment">Your Comment:</label>
      <textarea id="comment" v-model="comment" name="comment" />
      <button type="submit">Submit Comment</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    sharekey: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      comment: '',
    };
  },
  methods: {
    handleSubmit() {
      this.$store
        .dispatch('post/postComment', {
          sharekey: this.sharekey,
          comment: this.comment,
        })
        .catch(error => (this.error = error));
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  display: block;
  width: 100%;
  resize: vertical;
  height: 5em;
  padding: 0.5em;
}
</style>
