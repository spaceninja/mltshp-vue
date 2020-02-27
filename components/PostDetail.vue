<template>
  <div>
    <template v-if="sharekey">
      <h1>Post Detail Page: {{ title }}</h1>
      <img
        v-if="originalImageUrl"
        :src="originalImageUrl"
        :height="height"
        :width="width"
        alt=""
      />
      <!-- TODO: Convert this into an embed -->
      <p v-if="url">
        This looks like a video. <a :href="url">Click through to play it</a>.
      </p>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="description" v-html="$md.render(description)"></div>
      <ul>
        <li>Comment Count: {{ commentCount }}</li>
        <li>Views: {{ views }}</li>
        <li>Likes: {{ likes }}</li>
        <li>Saves: {{ saves }}</li>
        <li>Liked: {{ liked }}</li>
        <li>Saved: {{ saved }}</li>
        <li>NSFW: {{ nsfw }}</li>
        <li>Posted at: {{ postedAt }}</li>
      </ul>
      <UserCard v-if="user" v-bind="user" />
    </template>
    <template v-else>
      POST DETAIL SKELETON COMPONENT HERE
    </template>
  </div>
</template>

<script>
import UserCard from '@/components/UserCard';

export default {
  components: {
    UserCard,
  },
  inheritAttrs: false,
  props: {
    commentCount: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    liked: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: Number,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    nsfw: {
      type: Boolean,
      default: false,
    },
    originalImageUrl: {
      type: String,
      default: null,
    },
    permalinkPage: {
      type: String,
      default: null,
    },
    pivotId: {
      type: String,
      default: null,
    },
    postedAt: {
      type: String,
      default: null,
    },
    saved: {
      type: Boolean,
      default: false,
    },
    saves: {
      type: Number,
      default: null,
    },
    shakes: {
      type: Array,
      default: null,
    },
    sharekey: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    user: {
      type: Object,
      default: null,
    },
    views: {
      type: Number,
      default: null,
    },
    width: {
      type: Number,
      default: null,
    },
  },
  computed: {
    displayTitle() {
      if (this.title) return this.title;
      if (this.name) return this.name;
      return this.sharekey;
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
