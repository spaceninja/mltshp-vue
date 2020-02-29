<template>
  <div>
    <template v-if="sharekey">
      <h3>
        <nuxt-link :to="`/post/${sharekey}`">{{ displayTitle }}</nuxt-link>
      </h3>
      <NSFWShield
        :nsfw="nsfw"
        :sharekey="sharekey"
        :image-url="originalImageUrl"
        :video-url="url"
        :height="height"
        :width="width"
        :lazy="lazy"
      />
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
        <li>
          Posted at:
          <nuxt-link :to="`/post/${sharekey}`">{{ postedAt }}</nuxt-link>
        </li>
        <li v-if="user">
          Posted by:
          <nuxt-link :to="`/user/${user.name}`">
            {{ user.name }}
          </nuxt-link>
          <img
            v-if="user.profileImageUrl"
            :src="user.profileImageUrl"
            alt=""
            width="50"
          />
        </li>
      </ul>
    </template>
    <template v-else>
      POST DETAIL SKELETON COMPONENT HERE
    </template>
  </div>
</template>

<script>
import NSFWShield from '@/components/NSFWShield';

export default {
  components: {
    NSFWShield,
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
    lazy: {
      type: Boolean,
      default: false,
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

<style lang="scss" scoped></style>
