<template>
  <div
    v-if="isNotSafe"
    class="nsfw"
    :style="{
      '--overlay-width': width,
      '--overlay-height': height,
    }"
  >
    <div class="nsfw__overlay">
      <p>This may not be safe for viewing at work.</p>
      <p>
        <button @click="approve">Show me anyway!</button>
      </p>
    </div>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
defineProps<{
  width: number;
  height: number;
}>();

const hasUserApproval = ref(false);
const hideNSFW = useNSFW();

const isNotSafe = computed(() => !hasUserApproval.value && hideNSFW.value);

const approve = () => {
  hasUserApproval.value = true;
};
</script>

<style scoped>
.nsfw {
  aspect-ratio: var(--overlay-width) / var(--overlay-height);
  background: #333;
  color: white;
  display: grid;
  height: auto;
  max-width: 100%;
  width: calc(var(--overlay-width) * 1px);
}

.nsfw__overlay {
  margin: auto;
  text-align: center;
}
</style>
