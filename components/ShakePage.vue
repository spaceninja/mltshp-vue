<template>
  <div>
    <ShakeDetail :shake="shake" />
    <UserDetail v-if="user" :user="user" />
    <hr />
    <ShakeList :files="files" />
    <hr />
    <ShakePagination
      :shake-path="shakePath"
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

const props = defineProps<{
  shake: MltshpShake;
  files: MltshpFile[];
  user?: MltshpUser;
  before?: boolean;
  after?: boolean;
}>();

const shakePath = getShakePath(props.shake);
</script>
