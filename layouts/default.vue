<template>
  <div>
    <AppHeader />
    <nuxt />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';

export default {
  components: {
    AppHeader,
  },
};
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 1em;
}

nav ul {
  list-style: none;
  margin: 1em 0;
  padding: 0;
}

nav ul li {
  display: inline;
}

nav ul li + li {
  margin-left: 0.5em;
  padding-left: 0.5em;
  border-left: 1px solid silver;
}

.logo {
  font-weight: bold;
}
</style>
