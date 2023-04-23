<template>
  <div>
    <h2>User Shakes</h2>
    <ol>
      <li v-for="shake in user.shakes" :key="shake.id">
        {{ shake.id }} - {{ shake.name }}
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { MltshpUser } from '~/types/MltshpUser';

defineProps<{
  user: MltshpUser;
}>();
</script>
