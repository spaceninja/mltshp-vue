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
                loading="lazy"
              />
            </li>
            <li>
              <button @click="setReplyTo(comment.user.name)">Reply</button>
            </li>
          </ul>
        </li>
      </ol>
    </template>
    <CommentForm :sharekey="sharekey" :reply-to="replyTo" />
  </div>
</template>

<script>
import CommentForm from '@/components/CommentForm';

export default {
  components: {
    CommentForm,
  },
  props: {
    comments: {
      type: Array,
      default: null,
    },
    sharekey: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      replyTo: '',
    };
  },
  methods: {
    setReplyTo(username) {
      this.replyTo = username;
    },
  },
};
</script>

<style lang="scss" scoped></style>
