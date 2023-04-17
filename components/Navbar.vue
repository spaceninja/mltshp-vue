<template>
  <nav>
    <div>
      MLTSHP Vue
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
          <li>
            <nuxt-link href="/todo"> ToDos </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <hr />
  </nav>
</template>
