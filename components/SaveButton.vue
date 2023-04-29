<template>
  <div>
    <!-- if there's more than one shake, make a dropdown menu to choose from -->
    <template v-if="shakes.length > 1">
      <button
        :aria-expanded="isShakeMenuOpen"
        :disabled="isSaved"
        type="button"
        @click="toggleShakeMenu"
      >
        {{ isSaved ? 'Saved!' : 'Save+' }}
      </button>
      <ul :hidden="!isShakeMenuOpen">
        <li v-for="(shake, index) in shakes" :key="shake.id">
          <button
            :aria-describedby="errorMessage ? 'save-button-error' : undefined"
            type="button"
            @click="saveToShake(index)"
          >
            Save to {{ shake.type === 'user' ? 'Your Shake' : shake.name }}
          </button>
        </li>
      </ul>
    </template>
    <!-- if there's only one shake, we don't need a dropdown menu -->
    <template v-else-if="shakes.length === 1">
      <button
        :aria-describedby="errorMessage ? 'save-button-error' : undefined"
        :disabled="isSaved"
        type="button"
        @click="saveToShake(0)"
      >
        {{ isSaved ? 'Saved!' : 'Save' }}
      </button>
    </template>
    <span v-if="errorMessage" id="save-button-error" class="error">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { AuthShake } from '~/types/AuthUser';

const props = defineProps<{
  sharekey: string;
  saved: boolean;
  shakes: AuthShake[];
}>();

const isShakeMenuOpen = ref(false);
const isSaved = ref(props.saved);
const errorMessage = ref('');

const toggleShakeMenu = () => {
  isShakeMenuOpen.value = !isShakeMenuOpen.value;
};

const saveToShake = async (index: number) => {
  const { data, error } = await useFetch('/api/mltshp', {
    method: 'POST',
    headers: useRequestHeaders(['cookie']) as HeadersInit,
    query: { path: `/api/sharedfile/${props.sharekey}/save` },
    body: {
      shake_id: props.shakes[index].id,
    },
  });
  if (data.value) {
    isSaved.value = data.value.saved;
  }
  if (error.value) {
    if (error.value.statusCode === 400) {
      errorMessage.value = 'Error: you can’t save your own file.';
    } else if (error.value.statusCode === 403) {
      errorMessage.value =
        'Error: you don’t have permission to save to that shake';
    } else {
      errorMessage.value = `Error ${error.value.statusCode} ${error.value.statusMessage}`;
    }
  }
};
</script>
