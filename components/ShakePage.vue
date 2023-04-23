<template>
  <div>
    <ShakeDetail :shake="shake" />
    <hr />
    <ShakeList :files="files" />
    <hr />
    <ShakePagination
      :shake="shake"
      :files="files"
      :before="before"
      :after="after"
    />
  </div>
</template>

<script setup lang="ts">
import { MltshpShake } from '~/types/MltshpShake';
import { MltshpFile } from '~/types/MltshpFile';
import { MltshpUser } from '~/types/MltshpUser';

defineProps<{
  shake: MltshpShake;
  files: MltshpFile[];
  user?: MltshpUser;
  before?: boolean;
  after?: boolean;
}>();
</script>
