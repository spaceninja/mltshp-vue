<template>
  <div>
    <h1>What is This?</h1>

    <p>
      Welcome to MLTSHP in Vue! I'm doing my best to recreate
      <NuxtLink to="https://mltshp.com/">MLTSHP.com</NuxtLink> using
      <NuxtLink to="https://vuejs.org/">Vue</NuxtLink> and
      <NuxtLink to="https://nuxtjs.org/">Nuxt</NuxtLink> consuming the public
      <NuxtLink to="https://mltshp.com/developers">MLTSHP API</NuxtLink>.
    </p>

    <h2>Who's Making This?</h2>

    <p>
      <NuxtLink to="https://spaceninja.com/">Scott Vandehey</NuxtLink> is a
      front-end architect and CSS specialist with over 15 years experience. He
      curates the
      <NuxtLink to="https://twitter.com/fridayfrontend"
        >Friday Front-End twitter</NuxtLink
      >
      and <NuxtLink to="https://fridayfrontend.com/">newsletter</NuxtLink>,
      sharing front-end development tips and links every day. He is the author
      of “<NuxtLink to="https://www.amazon.com/dp/B01M0VOE6O"
        >How to Find a Better Job in Tech</NuxtLink
      >.” Follow him at
      <NuxtLink to="https://twitter.com/spaceninja">@spaceninja</NuxtLink>.
    </p>

    <p>
      Special thanks to
      <NuxtLink to="https://twitter.com/bradchoate">Brad Choate</NuxtLink> and
      <NuxtLink to="https://twitter.com/vosechu">Chuck Lauer Vose</NuxtLink> for
      their invaluable help.
    </p>

    <h2>I Found a Bug!</h2>

    <p>
      Note that there are some limitations imposed by the
      <NuxtLink to="https://mltshp.com/developers">API</NuxtLink>. Here's a list
      of
      <NuxtLink
        to="https://github.com/MLTSHP/mltshp/wiki/Missing-API-Functionality"
        >known issues</NuxtLink
      >.
    </p>

    <p>
      Find a bug?
      <NuxtLink to="https://github.com/spaceninja/mltshp-vue/issues"
        >Report it here</NuxtLink
      >.
    </p>
  </div>
</template>

<script setup lang="ts">
useServerSeoMeta({
  title: 'About',
});
</script>
