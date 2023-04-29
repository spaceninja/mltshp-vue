<template>
  <div>
    <h1>Upload</h1>
    <form @submit.prevent="handleUpload">
      <div v-if="errorMessage" class="error">
        {{ errorMessage }}
      </div>
      <p>
        <label for="image-file">
          <span v-if="imageFile">Selected File: {{ imageFile.name }}</span>
          <span v-else>Select File</span>
        </label>
        <input
          id="image-file"
          type="file"
          required
          @change="handleFileChange"
        />
      </p>
      <p>
        <label for="image-title">Title</label>
        <input id="image-title" v-model="imageTitle" type="text" />
      </p>
      <p>
        <label for="image-description">Description</label>
        <textarea id="image-description" v-model="imageDescription" />
      </p>
      <p v-if="user?.shakes && user.shakes.length > 1">
        <label for="image-shake">Shake</label>
        <select id="image-shake" v-model="imageShake">
          <option
            v-for="shake in user.shakes"
            :key="shake.id"
            :value="shake.id"
          >
            {{ shake.type === 'user' ? 'Your Shake' : shake.name }}
          </option>
        </select>
      </p>
      <p>
        <button class="btn btn-primary btn-shadow" type="submit">Upload</button>
      </p>
    </form>
    <aside class="faq">
      <h2>What Can I Upload or Save?</h2>
      <ul>
        <li>You can upload JPG, GIF, or PNG files.</li>
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

<script setup lang="ts">
import { AuthUser } from '~/types/AuthUser';

const { data: authData } = useAuth();
const user = authData.value?.user as AuthUser | undefined;

const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];

const imageFile: Ref<File | null> = ref(null);
const imageTitle = ref('');
const imageDescription = ref('');
const imageShake = ref(user?.shakes[0].id);
const errorMessage = ref('');

const handleFileChange = (event: Event) => {
  errorMessage.value = '';
  const target = event.target as HTMLInputElement;
  if (!target.files) return;
  const file: File = target.files[0];
  if (file.size > 20000000) {
    errorMessage.value = 'That image is over 20MB.';
    return;
  }
  if (!allowedFileTypes.includes(file.type)) {
    errorMessage.value = 'That file type is not supported.';
    return;
  }
  imageFile.value = file;
};

const handleUpload = async (event: Event) => {
  if (!imageFile.value) return;
  console.log('IMAGE', imageFile.value);

  console.log('EVENT', event.target);

  // create FormData
  const formData = new FormData();
  formData.append('file', imageFile.value);
  if (imageTitle.value) {
    formData.append('title', imageTitle.value);
  }
  if (imageDescription.value) {
    formData.append('description', imageDescription.value);
  }
  if (imageShake.value) {
    formData.append('shake_id', imageShake.value);
  }
  console.log('FORM DATA');
  for (const pair of formData.entries()) {
    console.log(pair);
  }

  const { data, error } = await useFetch('/api/mltshp/upload', {
    method: 'POST',
    headers: useRequestHeaders(['cookie']) as HeadersInit,
    query: { path: `/api/upload` },
    body: formData,
  });
  // If we got data, then the API submission was successful
  if (data.value) {
    console.log('SUCCESS!', data.value);
  }
  // Handle any errors
  if (error.value) {
    if (error.value.statusCode === 400) {
      errorMessage.value =
        'Error: the file could not be identified as an image.';
    } else {
      errorMessage.value = `Error ${error.value.statusCode} ${error.value.statusMessage}`;
    }
  }
};
</script>
