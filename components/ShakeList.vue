<template>
  <div>
    <ol>
      <PostCard v-for="file in files" :key="file.sharekey" :post="file" />
    </ol>
  </div>
</template>

<script setup lang="ts">
import { MltshpFile } from '~/types/MltshpFile';

defineProps<{
  files: MltshpFile[];
}>();
</script>
