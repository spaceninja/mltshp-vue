<template>
  <div>
    <h1>Upload an Image</h1>
    <AppAlert v-if="error" :error="error" />
    <form @submit.prevent="handleUpload">
      <p>
        <label for="image-file">
          <span v-if="imageFile">Selected File: {{ imageFile.name }}</span>
          <span v-else>Select File</span>
        </label>
        <input id="image-file" type="file" @change="handleFileChange" />
      </p>
      <p>
        <label for="image-title">Title</label>
        <input id="image-title" v-model="imageTitle" type="text" />
      </p>
      <p>
        <label for="image-description">Description</label>
        <textarea id="image-description" v-model="imageDescription" />
      </p>
      <p v-if="shakes.length > 1">
        <label for="image-shake">Shake</label>
        <select id="image-shake" v-model="imageShake">
          <option v-for="shake in shakes" :key="shake.id" :value="shake.id">
            {{ shake.type === 'user' ? 'Your Shake' : shake.name }}
          </option>
        </select>
      </p>
      <p>
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Uploading…' : 'Upload' }}
        </button>
      </p>
    </form>
    <aside class="faq">
      <h2>What Can I Upload or Save?</h2>
      <ul>
        <li>
          You can upload JPG, GIF, or PNG files.
        </li>
        <li>
          Image files should be a reasonable size. Be nice to your friends on
          mobile phones or tablets. Be nice to our bandwidth quota. There's a
          hard limit of 20MB per image.
        </li>
        <li>
          For more information, see the
          <a href="https://mltshp.com/faq/">FAQ</a>.
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import AppAlert from '@/components/AppAlert';
const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];

export default {
  components: {
    AppAlert,
  },
  data() {
    return {
      imageFile: null,
      imageTitle: null,
      imageDescription: null,
      imageShake: this.$auth.user.shakes[0].id,
      error: null,
      isLoading: false,
      shakes: this.$auth.user.shakes,
    };
  },
  methods: {
    handleFileChange(e) {
      this.error = null;
      const file = e.target.files[0];
      console.log('FILE', file);

      if (file.size > 20000000) {
        this.error = 'That image is over 20MB.';
        return;
      }

      if (!allowedFileTypes.includes(file.type)) {
        this.error = 'That file type is not supported.';
        return;
      }

      this.imageFile = file;
    },
    handleUpload() {
      this.isLoading = true;
      this.$store
        .dispatch('post/uploadFile', {
          file: this.imageFile,
          title: this.imageTitle,
          description: this.imageDescription,
          shake_id: this.imageShake,
        })
        .then(() => (this.isLoading = false))
        .catch(error => {
          this.isLoading = false;
          this.error = error;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
