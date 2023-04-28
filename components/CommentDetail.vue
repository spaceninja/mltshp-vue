<template>
  <li>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p v-html="formattedBody" />
  </li>
</template>

<script setup lang="ts">
import { MltshpComment } from '~/types/MltshpComment';

const props = defineProps<{
  comment: MltshpComment;
}>();

const formattedBody = computed(() => simpleFormatter(props.comment.body));
</script>
