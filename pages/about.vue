<template>
  <div>
    <h1>What is This?</h1>

    <p>
      Welcome to MLTSHP in Vue! I'm doing my best to recreate
      <a href="https://mltshp.com/">MLTSHP.com</a> using
      <a href="https://vuejs.org/">Vue.js</a> and
      <a href="https://nuxtjs.org/">NuxtJS</a> consuming the public
      <a href="https://mltshp.com/developers">MLTSHP API</a>. This is mostly an
      excuse for me to practice real-world JS skills like authentication, API
      calls, and how to interact with Vuex.
    </p>

    <h2>Who's Making This?</h2>

    <p>
      <a href="https://spaceninja.com/">Scott Vandehey</a> is a front-end
      architect and CSS specialist with over 15 years experience. He curates the
      <a href="https://twitter.com/fridayfrontend">Friday Front-End twitter</a>
      and <a href="https://fridayfrontend.com/">newsletter</a>, sharing
      front-end development tips and links every day. He is the author of “<a
        href="https://www.amazon.com/dp/B01M0VOE6O"
        >How to Find a Better Job in Tech</a
      >.” Follow him at
      <a href="https://twitter.com/spaceninja">@spaceninja</a>.
    </p>

    <p>
      Special thanks to
      <a href="https://twitter.com/bradchoate">Brad Choate</a> and
      <a href="https://twitter.com/vosechu">Chuck Lauer Vose</a> for their
      invaluable help.
    </p>

    <h2>I Found a Bug!</h2>

    <p>
      Note that there are some limitations imposed by the
      <a href="https://mltshp.com/developers">API</a>. Some known issues:
    </p>

    <ul>
      <li>
        Posts on user shakes do not show the original poster. (<a
          href="https://github.com/MLTSHP/mltshp/issues/589"
          >#589</a
        >)
      </li>
      <li>
        Can't unlike a post. (<a
          href="https://github.com/MLTSHP/mltshp/issues/592"
          >#592</a
        >)
      </li>
      <li>
        Can't unsave a post. (<a
          href="https://github.com/MLTSHP/mltshp/issues/593"
          >#593</a
        >)
      </li>
      <li>
        Can't save to multiple shakes. (<a
          href="https://github.com/MLTSHP/mltshp/issues/594"
          >#594</a
        >)
      </li>
      <li>
        Pagination links sometimes show "no posts" error if the linked page
        doesn't exist. (<a href="https://github.com/MLTSHP/mltshp/issues/597"
          >#597</a
        >)
      </li>
      <li>
        <a
          href="https://github.com/MLTSHP/mltshp/wiki/Missing-API-Functionality"
          >And more!</a
        >
      </li>
    </ul>

    <p>
      Find a bug?
      <a href="https://github.com/spaceninja/mltshp-vue/issues"
        >Report it here</a
      >.
    </p>
  </div>
</template>

<script>
export default {
  auth: false,
  head() {
    return {
      title: 'About',
    };
  },
};
</script>
