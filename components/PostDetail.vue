<template>
  <div>
    <template v-if="sharekey">
      <h1>
        <nuxt-link :to="`/post/${sharekey}`">{{ displayTitle }}</nuxt-link>
      </h1>
      <NSFWShield
        :nsfw="nsfw"
        :sharekey="sharekey"
        :image-url="originalImageUrl"
        :video-url="url"
        :height="height"
        :width="width"
        :is-detail="true"
      />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="description" v-html="$md.render(description)"></div>
      <ul>
        <li>Comment Count: {{ commentCount }}</li>
        <li>Views: {{ views }}</li>
        <li>Likes: {{ likes }}</li>
        <li>Saves: {{ saves }}</li>
        <li><LikeButton :sharekey="sharekey" :liked="liked" /></li>
        <li>
          <SaveButton
            :sharekey="sharekey"
            :saved="saved"
            :shakes="$auth.user.shakes"
          />
        </li>
        <li v-if="user && user.id === $auth.user.id">
          <button @click="toggleEditMode">
            {{ isEditing ? 'Cancel' : 'Edit' }}
          </button>
        </li>
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
      <PostEditForm
        v-if="isEditing"
        :title="displayTitle"
        :description="description"
        :sharekey="sharekey"
        @done-editing="toggleEditMode"
      />
    </template>
    <template v-else>
      POST DETAIL SKELETON COMPONENT HERE
    </template>
  </div>
</template>

<script>
import NSFWShield from '@/components/NSFWShield';
import LikeButton from '@/components/LikeButton';
import SaveButton from '@/components/SaveButton';
import PostEditForm from '@/components/PostEditForm';

export default {
  components: {
    NSFWShield,
    LikeButton,
    SaveButton,
    PostEditForm,
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
  data() {
    return {
      isEditing: false,
    };
  },
  computed: {
    displayTitle() {
      if (this.title) return this.title;
      if (this.name) return this.name;
      return this.sharekey;
    },
  },
  methods: {
    toggleEditMode() {
      this.isEditing = !this.isEditing;
    },
  },
};
</script>

<style lang="scss" scoped></style>
