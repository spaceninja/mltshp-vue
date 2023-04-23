<template>
  <footer>
    <ul>
      <li v-if="prevLink">
        <NuxtLink :to="prevLink">Previous</NuxtLink>
      </li>
      <li v-if="nextLink">
        <NuxtLink :to="nextLink">Next</NuxtLink>
      </li>
    </ul>
  </footer>
</template>

<script setup lang="ts">
import { MltshpFile } from '~/types/MltshpFile';

const props = defineProps<{
  files: MltshpFile[];
  before?: boolean;
  after?: boolean;
}>();

let prevLink = '';
let nextLink = '';

// @see https://github.com/MLTSHP/mltshp/blob/master/handlers/incoming.py
// @see https://github.com/MLTSHP/mltshp/blob/master/handlers/shake.py

// We're going to older
if (props.before) {
  // If there are no files, then we've somehow gone back beyond the last page
  if (props.files.length === 0) {
    // TODO: redirect to shake root
  }
  // If there's more than one page of files, then we can safely add both links
  else if (props.files.length > 9) {
    prevLink = `/incoming/before/${props.files[8].pivot_id}`;
    nextLink = `/incoming/after/${props.files[0].pivot_id}`;
  }
  // If there's one page or less of files, then we can't go back any further
  else {
    nextLink = `/incoming/after/${props.files[0].pivot_id}`;
  }
}
// We're going to newer
else if (props.after) {
  // If there's one page or less of files, then we can't go further forward
  if (props.files.length <= 9) {
    // TODO: redirect to shake root
  }
  // If there's more than one page of files, then we can safely add both links
  else {
    prevLink = `/incoming/before/${props.files[8].pivot_id}`;
    nextLink = `/incoming/after/${props.files[0].pivot_id}`;
  }
}
// We're on the first page
else {
  // If there's more than one page of files, then we can safely add a back link
  // eslint-disable-next-line no-lonely-if
  if (props.files.length > 9) {
    prevLink = `/incoming/before/${props.files[8].pivot_id}`;
  }
}
</script>
