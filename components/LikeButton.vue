<template>
  <div>
    <button
      :disabled="isLiked"
      :aria-describedby="errorMessage ? 'like-button-error' : undefined"
      @click="toggleLike"
    >
      {{ isLiked ? 'Liked!' : 'Like This' }}
    </button>
    <span v-if="errorMessage" id="like-button-error" class="error">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  sharekey: string;
  liked: boolean;
}>();

const isLiked = ref(props.liked);
const errorMessage = ref('');

const toggleLike = async () => {
  const { data, error } = await useFetch('/api/mltshp', {
    method: 'POST',
    headers: useRequestHeaders(['cookie']) as HeadersInit,
    query: { path: `/api/sharedfile/${props.sharekey}/like` },
  });
  if (data.value) {
    isLiked.value = data.value.liked;
  }
  if (error.value) {
    if (error.value.statusCode === 400) {
      errorMessage.value = 'Error: unable to like that post';
    } else {
      errorMessage.value = `Error ${error.value.statusCode} ${error.value.statusMessage}`;
    }
  }
};
</script>
