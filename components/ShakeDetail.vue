<template>
  <div>
    <h1>{{ shake.name }}</h1>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="formattedDescription" />
    <img v-if="largeThumbnailUrl" :src="largeThumbnailUrl" alt="" width="142" />
    <ul>
      <li v-if="shake.created_at">
        {{ shake.type === 'user' ? 'Member since' : 'Created' }}:
        {{ shake.created_at }}
      </li>
      <li v-if="shake.updated_at">Updated: {{ shake.updated_at }}</li>
      <li v-if="shake.owner">
        Owner:
        <NuxtLink :to="`/user/${shake.owner.name}`">
          {{ shake.owner.name }}
        </NuxtLink>
        <img
          v-if="shake.owner.profile_image_url"
          :src="shake.owner.profile_image_url"
          alt=""
          width="50"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { MltshpShake } from '~/types/MltshpShake';

const props = defineProps<{
  shake: MltshpShake;
}>();

// Apply formatting to the post description
const formattedDescription = computed(() =>
  simpleFormatter(props.shake.description ?? '')
);

const largeThumbnailUrl = computed(() => {
  if (
    props.shake.thumbnail_url &&
    props.shake.thumbnail_url.includes('_small.')
  ) {
    return props.shake.thumbnail_url.replace('_small.', '.');
  }
  return props.shake.thumbnail_url;
});
</script>
