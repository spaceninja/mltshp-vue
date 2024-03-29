<template>
  <form @submit.prevent="handleSubmit">
    <p>
      <label for="comment">Your Comment:</label>
      <textarea id="comment" v-model="comment" name="comment" />
    </p>
    <p>
      <button type="submit">Submit Comment</button>
    </p>
    <div v-if="errorMessage" class="error">
      {{ errorMessage }}
    </div>
  </form>
</template>

<script setup lang="ts">
const route = useRoute();

const emit = defineEmits(['new-comment']);

// Local state
const comment = ref('');
const errorMessage = ref('');

// Load shared state
const { replyTo } = useComment();

// If the reply-to value changes, prepend it to the comment
watch(
  () => replyTo.value,
  (username) => {
    comment.value = username ? `@${username} ${comment.value}` : comment.value;
  }
);

// On submit, send to the API, and handle the result
const handleSubmit = async () => {
  const { data, error } = await useFetch('/api/mltshp', {
    method: 'POST',
    headers: useRequestHeaders(['cookie']) as HeadersInit,
    query: { path: `/api/sharedfile/${route.params.key}/comments` },
    body: {
      body: comment.value,
    },
  });
  // If we got data, then the API submission was successful
  if (data.value) {
    emit('new-comment');
    // clear the comment form and any reply-to value
    comment.value = '';
    replyTo.value = '';
  }
  // Handle any errors
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
