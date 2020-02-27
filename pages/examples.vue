<template>
  <div>
    <h1>Useful Examples</h1>

    <h2>Shakes</h2>
    <ul>
      <li>
        <nuxt-link to="shake/test">Shake with no posts</nuxt-link> (needed!)
      </li>
      <li>
        <nuxt-link to="shake/long-names-like-Llanfairp">
          Shake with lengthy text
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="shake/long-names-like-Llanfairp">
          Shake with 3 posts
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="shake/barbarella">Shake with many posts</nuxt-link>
      </li>
      <li><nuxt-link to="shake/pr0n">Shake with NSFW images</nuxt-link></li>
    </ul>

    <h2>Posts</h2>
    <ul>
      <li><nuxt-link to="/post/1BG3N">Post with lengthy text</nuxt-link></li>
      <li><nuxt-link to="/post/1I07K">Very large image</nuxt-link></li>
      <li><nuxt-link to="/post/1HSZV">Medium image</nuxt-link></li>
      <li><nuxt-link to="/post/1HIVO">Small image</nuxt-link></li>
      <li><nuxt-link to="/post/1HUU7">NSFW image</nuxt-link></li>
      <li><nuxt-link to="/post/1GTH7">YouTube video</nuxt-link></li>
      <li><nuxt-link to="/post/1GHT1">Vimeo video</nuxt-link></li>
      <li><nuxt-link to="/post/1I0YQ">Flickr video</nuxt-link></li>
      <li><nuxt-link to="/post/1BQQ6">Flickr vertical video</nuxt-link></li>
    </ul>

    <h2>Comments</h2>
    <ul>
      <li><nuxt-link to="/post/1GQ2N">Post with many comments</nuxt-link></li>
      <li><nuxt-link to="/post/1HIVO">Post with no comments</nuxt-link></li>
    </ul>

    <h2>Users</h2>
    <ul>
      <li><nuxt-link to="/user/tonyb">User with lots of Shakes</nuxt-link></li>
      <li><nuxt-link to="/user/vosechu">User with no Shakes</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
