<template>
  <li>
    {{ comment.body }}
  </li>
</template>

<script setup lang="ts">
import { MltshpComment } from '~/types/MltshpComment';

defineProps<{
  comment: MltshpComment;
}>();
</script>
