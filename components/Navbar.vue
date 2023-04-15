<template>
  <nav>
    <div>
      <a href="https://github.com/sidebase/nuxt-auth" target="_blank">
        <span>🔐 nuxt-auth</span>
      </a>
      <div id="navbar-default">
        <ul>
          <li>
            <nuxt-link href="/"> Home </nuxt-link>
          </li>
          <li>
            <nuxt-link href="/protected/globally">
              Globally Protected
            </nuxt-link>
          </li>
          <li>
            <nuxt-link href="/protected/locally">
              Locally Unprotected
            </nuxt-link>
          </li>
          <li>
            <nuxt-link href="/api-routes"> API Routes </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
