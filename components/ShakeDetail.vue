<template>
  <div>
    <h1>{{ shake.name }}</h1>
    <p>{{ shake.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { MltshpShake } from '~/types/MltshpShake';

defineProps<{
  shake: MltshpShake;
}>();
</script>
