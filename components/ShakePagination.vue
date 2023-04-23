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
  shakePath: string;
  before?: boolean;
  after?: boolean;
}>();

/**
 * Should we add next or previous links?
 * The logic here is a bit complex, but the gist of it is that we request one
 * more item per "page" than we actually display, and we can use the length of
 * the array of items to determine whether we need a next or previous link.
 *
 * @see https://github.com/MLTSHP/mltshp/blob/master/handlers/incoming.py
 * @see https://github.com/MLTSHP/mltshp/blob/master/handlers/shake.py
 */
let prevLink = '';
let nextLink = '';

if (props.before) {
  /**
   * Before Page
   * On a `/before` page, we know there's at least one "next" page, and we
   * check the length of the file list to see if there's a "previous" page.
   * - If there's more files than we display in a page, then we can safely
   *   add both a previous and a next link.
   * - If there's less than or equal files than we display in a page, then
   *   we know we're on the last page, and only add a next link.
   * - If there's no files, then we've somehow ended up beyond the last page,
   *   (probably someone messing with the URL), and we redirect to the root.
   */
  if (props.files.length === 0) {
    await navigateTo(props.shakePath);
  } else if (props.files.length > 9) {
    prevLink = `${props.shakePath}/before/${props.files[8].pivot_id}`;
    nextLink = `${props.shakePath}/after/${props.files[0].pivot_id}`;
  } else {
    nextLink = `${props.shakePath}/after/${props.files[0].pivot_id}`;
  }
} else if (props.after) {
  /**
   * After Page
   * On an `/after` page, we know there's at least one "previous" page, and we
   * check the length of the file list to see if there's a "next" page.
   * - If there's more files than we display in a page, then we can safely
   *   add both a previous and a next link.
   * - If there's less than or equal files than we display in a page, then
   *   we know we're on the first page, and we redirect to the root.
   */
  if (props.files.length <= 9) {
    await navigateTo(props.shakePath);
  } else {
    prevLink = `${props.shakePath}/before/${props.files[9].pivot_id}`;
    nextLink = `${props.shakePath}/after/${props.files[1].pivot_id}`;
  }
} else {
  /**
   * Root Page
   * On the root page, we know there's no "next" page, and we check the length
   * of the file list to see if there's a "previous" page.
   * - If there's more files than we display in a page, then we can safely add
   *   a previous link.
   * - If there's less than or equal files than we display in a page, then this
   *   shake only has one page, and we add no links.
   */
  // eslint-disable-next-line no-lonely-if
  if (props.files.length > 9) {
    prevLink = `${props.shakePath}/before/${props.files[8].pivot_id}`;
  }
}
</script>
