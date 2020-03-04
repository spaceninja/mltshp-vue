<template>
  <li>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="body" v-html="$md.render(bodyWithUsernames)"></div>
    <ul>
      <li>Posted at: {{ postedAt }}</li>
      <li>
        Posted by:
        <nuxt-link :to="`/user/${user.name}`">{{ user.name }}</nuxt-link>
      </li>
      <li>
        <img
          v-if="user.profileImageUrl"
          :src="user.profileImageUrl"
          alt=""
          width="50"
          loading="lazy"
        />
      </li>
      <li>
        <button @click="$emit('reply-to', user.name)">Reply</button>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    body: {
      type: String,
      required: true,
    },
    postedAt: {
      type: String,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // convert @username to links
    bodyWithUsernames() {
      // matches @username at the start of the line or following a space
      // will not match email addresses
      const regex = /(^|[^@\w])@(\w+)\b/gi;
      return this.body.replace(regex, `$1[@$2](/user/$2)`);
    },
  },
};
</script>
