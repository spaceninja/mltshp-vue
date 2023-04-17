<script lang="ts">
export default {
  props: {
    route: { type: String, required: true },
    method: { type: String, required: true },
    link: { type: String, required: true },
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
