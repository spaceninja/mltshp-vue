<template>
  <div>
    <table>
      <thead>
        <tr>
          <th scope="col">Route</th>
          <th scope="col">Method</th>
          <th scope="col">Link</th>
        </tr>
      </thead>
      <tbody>
        <APITableRow route="/session" method="get" link="/api/auth/session" />
        <APITableRow route="/csrf" method="get" link="/api/auth/csrf" />
        <APITableRow
          route="/providers"
          method="get"
          link="/api/auth/providers"
        />
        <APITableRow route="/signin" method="get" link="/api/auth/signin" />
        <APITableRow
          route="/signin/mltshp"
          method="post"
          link="/api/auth/signin/mltshp"
        />
        <APITableRow
          route="/callback/mltshp"
          method="get & post"
          link="/api/auth/callback/mltshp"
        />
        <APITableRow
          route="/signout"
          method="get & post"
          link="/api/auth/signout"
        />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ auth: false });
</script>
