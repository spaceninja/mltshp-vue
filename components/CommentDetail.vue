<template>
  <li>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="formattedBody" />
    <button @click="$emit('reply-to', comment.user.name)">Reply</button>
  </li>
</template>

<script setup lang="ts">
import { MltshpComment } from '~/types/MltshpComment';

defineEmits(['reply-to']);

const props = defineProps<{
  comment: MltshpComment;
}>();

const formattedBody = computed(() => simpleFormatter(props.comment.body));
</script>
