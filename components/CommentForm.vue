<template>
  <form @submit.prevent="handleSubmit">
    <div v-if="errorMessage">
      {{ errorMessage }}
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

<script setup lang="ts">
const comment = ref('');
const errorMessage = ref('');

const emit = defineEmits(['new-comment']);

const props = defineProps<{
  sharekey: string;
  replyTo?: string;
}>();

watch(
  () => props.replyTo,
  (replyTo) => {
    comment.value = `@${replyTo} ${comment.value}`;
  }
);

const handleSubmit = async () => {
  const { data, error } = await useFetch('/api/mltshp', {
    method: 'POST',
    headers: useRequestHeaders(['cookie']) as HeadersInit,
    query: { path: `/api/sharedfile/${props.sharekey}/comments` },
    body: {
      body: comment.value,
    },
  });
  if (data.value) {
    emit('new-comment', data.value);
    comment.value = '';
  }
  if (error.value) {
    if (error.value.statusCode === 400) {
      errorMessage.value =
        'Error: comment could not be saved due to a missing parameter or failed spam check.';
    } else {
      errorMessage.value = `Error ${error.value.statusCode} ${error.value.statusMessage}`;
    }
  }
};
</script>
