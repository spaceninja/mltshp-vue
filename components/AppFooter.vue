<template>
  <footer>
    <nav v-if="$auth.loggedIn" aria-labelledby="footer-nav-title">
      <p id="footer-nav-title" class="sr-only">Footer Navigation</p>
      <ul>
        <li><nuxt-link to="/about">About</nuxt-link></li>
        <li><nuxt-link to="/examples">Examples</nuxt-link></li>
        <li><nuxt-link to="/settings">Settings</nuxt-link></li>
        <li><nuxt-link to="/styleguide">Styleguide</nuxt-link></li>
        <li>
          <nuxt-link to="/user/mltshp">Follow the MLTSHP User!</nuxt-link>
        </li>
      </ul>
      <ul>
        <li><a href="mailto:hello@mltshp.com">Contact Us</a></li>
        <li><a href="https://mltshphq.tumblr.com/">Blog</a></li>
        <li><a href="https://twitter.com/mltshphq">Twitter</a></li>
        <li>
          <a href="https://twitter.com/best_of_mltshp"
            >Best of MLTSHP Twitter</a
          >
        </li>
        <li><a href="https://mltshp.com/developers">Developers</a></li>
        <li><a href="https://mltshp.com/terms-of-use">Terms of Use</a></li>
        <li>
          <a href="https://mltshp.com/code-of-conduct">Code of Conduct</a>
        </li>
      </ul>
    </nav>
    <p>© <a href="https://mltshp.com/">MLTSHP, Inc.</a> All Rights Reserved</p>
  </footer>
</template>
