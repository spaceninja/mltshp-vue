<template>
  <ShakeLoader :shake-name="$route.params.slug" />
</template>

<script>
import ShakeLoader from '@/components/ShakeLoader';

export default {
  validate({ params }) {
    return params.slug;
  },
  components: {
    ShakeLoader,
  },
};
</script>
