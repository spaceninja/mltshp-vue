<script lang="ts">
export default {
  props: {
    route: String,
    method: String,
    link: String,
  },
};
</script>

<template>
  <tr>
    <th scope="row">
      {{ route }}
    </th>
    <td>
      {{ method }}
    </td>
    <td>
      <nuxt-link :href="link" target="_blank"> View Route </nuxt-link>
    </td>
  </tr>
</template>
