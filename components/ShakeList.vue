<template>
  <div>
    <ol>
      <li v-for="file in files" :key="file.sharekey">
        <NuxtLink :to="`/post/${file.sharekey}`">
          {{ file.pivot_id }} - {{ file.title }}
        </NuxtLink>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { MltshpFile } from '~/types/MltshpFile';

defineProps<{
  files: MltshpFile[];
}>();
</script>
