<template>
  <div>
    <label for="post-title">Title</label>
    <input id="post-title" v-model="editedTitle" />
    <label for="post-description">Description</label>
    <textarea id="post-description" v-model="editedDescription" />
    <button type="button" @click="saveEdits">Save</button>
    <button type="button" @click="emit('cancel')">Cancel</button>
    <span v-if="errorMessage" class="error">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['save', 'cancel']);

const props = defineProps<{
  sharekey: string;
  title?: string;
  description?: string;
}>();

const errorMessage = ref('');
const editedTitle = ref(props.title);
const editedDescription = ref(props.description);

const saveEdits = async () => {
  const { data, error } = await useFetch('/api/mltshp', {
    method: 'POST',
    headers: useRequestHeaders(['cookie']) as HeadersInit,
    query: { path: `/api/sharedfile/${props.sharekey}` },
    body: {
      title: editedTitle.value,
      description: editedDescription.value,
    },
  });
  if (data.value) {
    emit('save');
  }
  if (error.value) {
    if (error.value.statusCode === 403) {
      errorMessage.value = 'Error: you don’t have permission to edit this file';
    } else {
      errorMessage.value = `Error ${error.value.statusCode} ${error.value.statusMessage}`;
    }
  }
};
</script>
