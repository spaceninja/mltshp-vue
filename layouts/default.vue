<template>
  <div>
    <AppHeader />
    <hr />
    <nuxt />
    <hr />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';

export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style lang="scss">
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

// responsive images
img {
  max-width: 100%;
  height: auto;
}

// responsive iframes: https://css-tricks.com/responsive-iframes/
[style*='--aspect-ratio'] > :first-child {
  width: 100%;
}
[style*='--aspect-ratio'] > img {
  height: auto;
}
@supports (--custom: property) {
  [style*='--aspect-ratio'] {
    position: relative;
  }
  [style*='--aspect-ratio']::before {
    content: '';
    display: block;
    padding-bottom: calc(100% * var(--aspect-ratio));
  }
  [style*='--aspect-ratio'] > :first-child {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
}

// screenreaders only
// https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe
.sr-only {
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: polygon(0px 0px, 0px 0px, 0px 0px);
  -webkit-clip-path: polygon(0px 0px, 0px 0px, 0px 0px);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
}
</style>
