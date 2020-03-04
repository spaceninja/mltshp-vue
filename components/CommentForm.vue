<template>
  <form @submit.prevent="handleSubmit">
    <div id="errors" role="alert" aria-atomic="true">
      <AppAlert v-if="error" id="comment-form-error" :error="error" />
    </div>
    <p>
      <label for="comment">Your Comment:</label>
      <textarea id="comment" v-model="comment" name="comment" />
    </p>
    <p>
      <button type="submit">Submit Comment</button>
    </p>
  </form>
</template>

<script>
import AppAlert from '@/components/AppAlert';

export default {
  components: {
    AppAlert,
  },
  props: {
    sharekey: {
      type: String,
      default: null,
    },
    replyTo: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      comment: '',
      error: null,
    };
  },
  watch: {
    replyTo(username) {
      this.comment = `@${username} ${this.comment}`;
    },
  },
  methods: {
    handleSubmit() {
      this.$store
        .dispatch('post/postComment', {
          sharekey: this.sharekey,
          comment: this.comment,
        })
        .then(() => (this.comment = ''))
        .catch(error => (this.error = error));
    },
  },
};
</script>
