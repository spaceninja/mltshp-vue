<template>
  <footer>
    <nav aria-labelledby="footer-nav-title">
      <p id="footer-nav-title" class="sr-only">Footer Navigation</p>
      <ul>
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/examples">Examples</NuxtLink></li>
        <li><NuxtLink to="/settings">Settings</NuxtLink></li>
        <li><NuxtLink to="/styleguide">Styleguide</NuxtLink></li>
        <li><NuxtLink to="/user/mltshp">Follow the MLTSHP User!</NuxtLink></li>
      </ul>
      <ul>
        <li><NuxtLink to="mailto:hello@mltshp.com">Contact Us</NuxtLink></li>
        <li><NuxtLink to="https://mltshphq.tumblr.com/">Blog</NuxtLink></li>
        <li><NuxtLink to="https://twitter.com/mltshphq">Twitter</NuxtLink></li>
        <li>
          <NuxtLink to="https://twitter.com/best_of_mltshp"
            >Best of MLTSHP Twitter</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="https://mltshp.com/developers">Developers</NuxtLink>
        </li>
        <li>
          <NuxtLink to="https://mltshp.com/terms-of-use">Terms of Use</NuxtLink>
        </li>
        <li>
          <NuxtLink to="https://mltshp.com/code-of-conduct"
            >Code of Conduct</NuxtLink
          >
        </li>
      </ul>
    </nav>
    <p>
      © <NuxtLink to="https://mltshp.com/">MLTSHP, Inc.</NuxtLink> All Rights
      Reserved
    </p>
  </footer>
</template>
