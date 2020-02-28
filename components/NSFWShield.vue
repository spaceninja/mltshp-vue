<template>
  <div>
    <div
      v-if="isNotSafe"
      class="nsfw"
      :style="{
        '--aspect-ratio': height / width,
      }"
    >
      <div class="overlay">
        <div class="content">
          <p>This may not be safe for viewing at work.</p>
          <p><button @click="approve">Show me anyway!</button></p>
        </div>
      </div>
    </div>
    <template v-else>
      <!-- eslint-disable-next-line vue/require-component-is -->
      <component v-if="imageUrl" v-bind="linkProps(isDetail)">
        <img :src="imageUrl" :height="height" :width="width" alt="" />
      </component>
      <VideoEmbed v-if="videoUrl" :url="videoUrl" />
    </template>
  </div>
</template>

<script>
import VideoEmbed from '@/components/VideoEmbed';

export default {
  components: {
    VideoEmbed,
  },
  props: {
    isDetail: {
      type: Boolean,
      default: false,
    },
    sharekey: {
      type: String,
      required: true,
    },
    nsfw: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    videoUrl: {
      type: String,
      default: null,
    },
    width: {
      type: Number,
      default: 640,
    },
    height: {
      type: Number,
      default: 360,
    },
  },
  data() {
    return {
      hasUserApproval: false,
    };
  },
  computed: {
    isNotSafe() {
      return this.nsfw && !this.hasUserApproval;
    },
  },
  methods: {
    approve() {
      this.hasUserApproval = true;
    },
    linkProps(isDetail) {
      if (isDetail) {
        return {
          is: 'a',
          href: this.imageUrl,
        };
      }
      return {
        is: 'nuxt-link',
        to: `/post/${this.sharekey}`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.nsfw {
  max-width: 100%;
  background: #333;
  color: white;

  > :first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}
</style>
