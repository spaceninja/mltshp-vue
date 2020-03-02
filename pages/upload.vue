<template>
  <UploadForm />
</template>

<script>
import UploadForm from '@/components/UploadForm';

export default {
  components: {
    UploadForm,
  },
  head() {
    return {
      title: 'Upload an Image',
    };
  },
};
</script>
