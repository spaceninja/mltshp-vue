<template>
  <div>
    <template v-if="comments && comments.length">
      <h2>Comments</h2>
      <ol>
        <li v-for="comment in comments" :key="comment.id">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-if="comment.body" v-html="$md.render(comment.body)"></div>
          <ul>
            <li>Posted at: {{ comment.postedAt }}</li>
            <li>
              Posted by:
              <nuxt-link :to="`/user/${comment.user.name}`">{{
                comment.user.name
              }}</nuxt-link>
            </li>
            <li>
              <img
                v-if="comment.user.profileImageUrl"
                :src="comment.user.profileImageUrl"
                alt=""
                width="50"
              />
            </li>
          </ul>
        </li>
      </ol>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped></style>
