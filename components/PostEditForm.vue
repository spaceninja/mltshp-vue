<template>
  <form @submit.prevent="saveChanges">
    <div id="errors" role="alert" aria-atomic="true">
      <AppAlert v-if="error" id="edit-form-error" :error="error" />
    </div>
    <p>
      <label for="post-title">Title</label>
      <input id="post-title" v-model="editedTitle" type="text" />
    </p>
    <p>
      <label for="post-description">Description</label>
      <textarea id="post-description" v-model="editedDescription" />
    </p>
    <p>
      <button type="submit">Save</button>
      <button @click="cancelEdit">Cancel</button>
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
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    sharekey: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      editedTitle: this.title,
      editedDescription: this.description,
      error: null,
    };
  },
  methods: {
    saveChanges() {
      console.log('SAVE CHANGES', this.editedTitle, this.editedDescription);
      this.$store
        .dispatch('post/editPost', {
          sharekey: this.sharekey,
          title: this.editedTitle,
          description: this.editedDescription,
        })
        .then(() => this.$emit('done-editing'))
        .catch(error => (this.error = error));
    },
    cancelEdit() {
      console.log('CANCEL EDITING');
      this.$emit('done-editing');
    },
  },
};
</script>
