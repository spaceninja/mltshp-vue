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
const route = useRoute();

const comment = ref('');
const errorMessage = ref('');

const { replyTo, postedComments } = useComment();

watch(
  () => replyTo.value,
  (username) => {
    comment.value = username ? `@${username} ${comment.value}` : comment.value;
  }
);

const handleSubmit = async () => {
  const { data, error } = await useFetch('/api/mltshp', {
    method: 'POST',
    headers: useRequestHeaders(['cookie']) as HeadersInit,
    query: { path: `/api/sharedfile/${route.params.key}/comments` },
    body: {
      body: comment.value,
    },
  });
  if (data.value) {
    // save the comment to state so we can display it without reloading the post
    postedComments.value.push(data.value);
    // clear the comment form and any reply-to value
    comment.value = '';
    replyTo.value = '';
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
