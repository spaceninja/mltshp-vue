<template>
  <div>
    <div>Post state: {{ resDataSuccess }}</div>
    <div>Get Data: {{ resData.text }}</div>
  </div>
</template>

<script setup lang="ts">
// const { getSession } = useAuth();
// const session = await getSession();

// const headers = useRequestHeaders(['cookie']) as HeadersInit;
// const { data: token } = await useFetch('/api/token', { headers });

const { data: resDataSuccess } = await useFetch('/api/test', {
  method: 'post',
  body: { text: 'Nuxt is Awesome!' },
});
const { data: resData } = await useFetch('/api/test');

// const { data: image } = await useFetch('https://mltshp.com/api/sharedfile/GA4', {
//   headers: {
//     Authorization: generateMltshpAuthString('/api/sharedfile/GA4', )
//   }
// })
</script>
