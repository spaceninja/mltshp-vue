<template>
  <aside>
    <template v-if="id">
      <h1>Shake List Page: {{ name }}</h1>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="description" v-html="$md.render(description)"></div>
      <img v-if="largeThumbnailUrl" :src="largeThumbnailUrl" alt="" />
      <ul>
        <li v-if="createdAt">Created: {{ createdAt }}</li>
        <li v-if="updatedAt">Updated: {{ updatedAt }}</li>
        <li>Type: {{ type }}</li>
      </ul>
      <UserCard v-if="owner" v-bind="owner" />
    </template>
    <template v-else>
      SHAKE DETAIL SKELETON COMPONENT HERE
    </template>
  </aside>
</template>

<script>
import UserCard from '@/components/UserCard';

export default {
  components: {
    UserCard,
  },
  inheritAttrs: false,
  props: {
    createdAt: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    id: {
      type: [String, Number],
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    owner: {
      type: Object,
      default: null,
    },
    thumbnailUrl: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    updatedAt: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
  },
  computed: {
    largeThumbnailUrl() {
      if (this.thumbnailUrl.includes('_small.')) {
        return this.thumbnailUrl.replace('_small.', '.');
      }
      return this.thumbnailUrl;
    },
  },
};
</script>

<style lang="scss" scoped></style>
