<template>
  <footer class="app-footer">
    <nav class="app-footer__nav" aria-labelledby="footer-nav-title">
      <p id="footer-nav-title" class="sr-only">Footer Navigation</p>
      <ul class="app-footer__nav-list">
        <li class="app-footer__nav-item">
          <NuxtLink to="/about">About</NuxtLink>
        </li>
        <li v-if="isAdmin" class="app-footer__nav-item">
          <NuxtLink to="/examples">Examples</NuxtLink>
        </li>
        <li v-if="isAdmin" class="app-footer__nav-item">
          <NuxtLink to="/styleguide">Styleguide</NuxtLink>
        </li>
        <li class="app-footer__nav-item">
          <NuxtLink to="/user/mltshp">Follow the MLTSHP User!</NuxtLink>
        </li>
      </ul>
      <ul class="app-footer__nav-list">
        <li class="app-footer__nav-item">
          <NuxtLink to="mailto:hello@mltshp.com">Contact Us</NuxtLink>
        </li>
        <li class="app-footer__nav-item">
          <NuxtLink to="https://mltshphq.tumblr.com/">Blog</NuxtLink>
        </li>
        <li class="app-footer__nav-item">
          <NuxtLink to="https://twitter.com/mltshphq">Twitter</NuxtLink>
        </li>
        <li class="app-footer__nav-item">
          <NuxtLink to="https://twitter.com/best_of_mltshp"
            >Best of MLTSHP Twitter</NuxtLink
          >
        </li>
        <li class="app-footer__nav-item">
          <NuxtLink to="https://mltshp.com/developers">Developers</NuxtLink>
        </li>
        <li class="app-footer__nav-item">
          <NuxtLink to="https://mltshp.com/terms-of-use">Terms of Use</NuxtLink>
        </li>
        <li class="app-footer__nav-item">
          <NuxtLink to="https://mltshp.com/code-of-conduct"
            >Code of Conduct</NuxtLink
          >
        </li>
      </ul>
    </nav>
    <p class="app-footer__copyright">
      © <NuxtLink to="https://mltshp.com/">MLTSHP, Inc.</NuxtLink> All Rights
      Reserved
    </p>
  </footer>
</template>

<script setup lang="ts">
import { AuthUser } from '~/types/AuthUser';

const { data: authData } = useAuth();
const user = authData.value?.user as AuthUser | undefined;

const isAdmin = computed(() => user?.name === 'spaceninja');
</script>
