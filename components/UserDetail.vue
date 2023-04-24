<template>
  <div v-if="groupShakes.length">
    <h2>User Shakes</h2>
    <ol>
      <li v-for="shake in groupShakes" :key="shake.id">
        <NuxtLink :to="getShakePath(shake)">
          {{ shake.id }} - {{ shake.name }}
        </NuxtLink>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { MltshpUser } from '~/types/MltshpUser';

const props = defineProps<{
  user: MltshpUser;
}>();

// The user shake is always in slot 0, so we can just slice it off
const groupShakes = computed(() => {
  if (!props.user.shakes || props.user.shakes.length < 1) return [];
  return props.user?.shakes.slice(1);
});
</script>
