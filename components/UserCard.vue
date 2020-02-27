<template>
  <div>
    <template v-if="id">
      <h2>User Card: {{ displayName }}</h2>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="about" v-html="$md.render(about)"></div>
      <img v-if="profileImageUrl" :src="profileImageUrl" alt="" width="50" />
      <ul>
        <li v-if="website">
          <a :href="website">{{ displayName }}'s website</a>
        </li>
      </ul>
      <ShakeList
        v-if="shakes && shakes.length"
        :shakes="shakes"
        :user-name="displayName"
      />
    </template>
    <template v-else>
      USER DETAIL SKELETON COMPONENT HERE
    </template>
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
    about: {
      type: String,
      default: null,
    },
    id: {
      type: Number,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    profileImageUrl: {
      type: String,
      default: null,
    },
    shakes: {
      type: Array,
      default: null,
    },
    website: {
      type: String,
      default: null,
    },
  },
  computed: {
    displayName() {
      return this.shakes && this.shakes[0] ? this.shakes[0].name : this.name;
    },
  },
};
</script>

<style lang="scss" scoped></style>
