<template>
  <ShakeLoader
    :shake-name="$route.params.slug"
    :after-key="$route.params.key"
  />
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
