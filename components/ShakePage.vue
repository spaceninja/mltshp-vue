<template>
  <div>
    <ShakeDetail :shake="shake" />
    <hr />
    <ShakeList :files="files" />
    <hr />
    <ShakePagination :files="files" :before="before" :after="after" />
  </div>
</template>

<script setup lang="ts">
import { MltshpShake } from '~/types/MltshpShake';
import { MltshpFile } from '~/types/MltshpFile';

defineProps<{
  shake: MltshpShake;
  files: MltshpFile[];
  before?: boolean;
  after?: boolean;
}>();
</script>
