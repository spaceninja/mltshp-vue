<template>
  <div>
    <h1>Useful Examples</h1>

    <h2>Shakes</h2>
    <ul>
      <li><NuxtLink to="user/jwballan">Shake with no posts</NuxtLink></li>
      <li>
        <NuxtLink to="shake/long-names-like-llanfairp">
          Shake with lengthy text
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="shake/long-names-like-llanfairp">
          Shake with 3 posts
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="shake/barbarella">Shake with many posts</NuxtLink>
      </li>
      <li><NuxtLink to="shake/pr0n">Shake with NSFW images</NuxtLink></li>
      <li><NuxtLink to="/shake/0">Non-existent shake</NuxtLink></li>
    </ul>

    <h2>Posts</h2>
    <ul>
      <li><NuxtLink to="/post/1BG3N">Post with lengthy text</NuxtLink></li>
      <li><NuxtLink to="/post/1I07K">Very large image</NuxtLink></li>
      <li><NuxtLink to="/post/1HSZV">Medium image</NuxtLink></li>
      <li><NuxtLink to="/post/1HIVO">Small image</NuxtLink></li>
      <li><NuxtLink to="/post/1HUU7">NSFW image</NuxtLink></li>
      <li><NuxtLink to="/post/1GTH7">YouTube video</NuxtLink></li>
      <li><NuxtLink to="/post/1GHT1">Vimeo video</NuxtLink></li>
      <li><NuxtLink to="/post/1I0YQ">Flickr video</NuxtLink></li>
      <li><NuxtLink to="/post/1BQQ6">Flickr vertical video</NuxtLink></li>
      <li><NuxtLink to="/post/0">Non-existent post</NuxtLink></li>
    </ul>

    <h2>Comments</h2>
    <ul>
      <li><NuxtLink to="/post/1GQ2N">Post with many comments</NuxtLink></li>
      <li><NuxtLink to="/post/1HIVO">Post with no comments</NuxtLink></li>
    </ul>

    <h2>Users</h2>
    <ul>
      <li><NuxtLink to="/user/tonyb">User with lots of Shakes</NuxtLink></li>
      <li><NuxtLink to="/user/vosechu">User with no Shakes</NuxtLink></li>
      <li><NuxtLink to="/user/0">Non-existent user</NuxtLink></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
useServerSeoMeta({
  title: 'Examples',
});
</script>
