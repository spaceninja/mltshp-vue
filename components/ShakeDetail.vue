<template>
  <aside v-if="id">
    <h1>{{ name }}</h1>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="about" v-html="$md.render(about)"></div>
    <img v-if="largeThumbnailUrl" :src="largeThumbnailUrl" alt="" />
    <ul>
      <li v-if="createdAt">Created: {{ createdAt }}</li>
      <li v-if="updatedAt">Updated: {{ updatedAt }}</li>
      <li v-if="type === 'user' && owner && owner.website">
        <a :href="owner.website">{{ owner.website }}</a>
      </li>
      <li v-if="type !== 'user' && owner">
        Owner:
        <nuxt-link :to="`/user/${owner.name}`">
          {{ userDisplayName }}
        </nuxt-link>
        <img
          v-if="owner.profileImageUrl"
          :src="owner.profileImageUrl"
          alt=""
          width="50"
        />
      </li>
    </ul>
    <ShakeList
      v-if="type === 'user' && filteredShakes && filteredShakes.length"
      :shakes="filteredShakes"
      :user-name="userDisplayName"
    />
  </aside>
  <div v-else>
    SHAKE DETAIL SKELETON COMPONENT HERE
  </div>
</template>

<script>
import ShakeList from '@/components/ShakeList';

export default {
  components: {
    ShakeList,
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
    about() {
      if (this.type === 'user') {
        return this.owner.about;
      }
      return this.description;
    },
    filteredShakes() {
      return (
        this.owner && this.owner.shakes.filter(shake => shake.type !== 'user')
      );
    },
    userDisplayName() {
      return this.owner && this.owner.shakes && this.owner.shakes[0]
        ? this.owner.shakes[0].name
        : this.owner.name;
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 2em;
}
</style>
