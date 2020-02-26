<template>
  <div>
    <ShakeLoader
      :shake-name="$route.params.slug"
      :before-key="$route.params.key"
      :is-user="true"
    />
  </div>
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
