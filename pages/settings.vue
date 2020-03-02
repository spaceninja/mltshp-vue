<template>
  <SettingsForm />
</template>

<script>
import SettingsForm from '@/components/SettingsForm';

export default {
  components: {
    SettingsForm,
  },
  head() {
    return {
      title: 'Settings',
    };
  },
};
</script>
