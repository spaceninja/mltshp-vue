<template>
  <ShakeLoader shake-name="friends" :before-key="$route.params.key" />
</template>

<script>
import ShakeLoader from '@/components/ShakeLoader';

export default {
  validate({ params }) {
    return params.key;
  },
  components: {
    ShakeLoader,
  },
};
</script>
