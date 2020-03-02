<template>
  <div>
    <form @submit.prevent="saveChanges">
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
  </div>
</template>

<script>
export default {
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

<style lang="scss" scoped></style>
