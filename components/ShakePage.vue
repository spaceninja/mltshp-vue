<template>
  <div>
    <ShakeDetail :shake="shake" />
    <UserDetail v-if="user" :user="user" />
    <hr />
    <ShakeList :files="filteredFiles" />
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

/**
 * Filtered Files
 * In order to match the navigation logic, we want to only display 9 of
 * the 10 files returned. See ShakePagination for more details.
 */
const filteredFiles = computed(() => {
  if (props.after) {
    // if on after page, display the last 9 items
    return props.files.slice(1);
  }
  // if on root or before page, display the first 9 items
  return props.files.slice(0, 9);
});
</script>
