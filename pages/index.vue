<template>
  <div>
    <HomePage />
    <h3>Authentication Overview</h3>
    <p>See all available authentication & session information below.</p>
    <pre v-if="status"><span>Status:</span> {{ status }}</pre>
    <pre v-if="data"><span>Data:</span> {{ data }}</pre>
    <pre v-if="csrfToken"><span>CSRF Token:</span> {{ csrfToken }}</pre>
    <pre v-if="providers"><span>Providers:</span> {{ providers }}</pre>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ auth: false });
const { data, status, getCsrfToken, getProviders } = useAuth();

const providers = await getProviders();
const csrfToken = await getCsrfToken();
</script>
