<template>
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
  <div v-else>
    <!-- eslint-disable-next-line vue/require-component-is -->
    <component v-if="imageUrl" v-bind="linkProps(isDetail)">
      <img
        :src="imageUrl"
        :height="height"
        :width="width"
        alt=""
        :loading="lazy ? 'lazy' : null"
      />
    </component>
    <VideoEmbed v-if="videoUrl" :url="videoUrl" />
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
    lazy: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hasUserApproval: false,
      disableNSFW: this.$auth.$storage.getUniversal('disableNSFW'),
    };
  },
  computed: {
    isNotSafe() {
      return this.nsfw && !this.hasUserApproval && !this.disableNSFW;
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
  background: #333333;
  color: white;
  max-width: 100%;

  > :first-child {
    align-items: center;
    display: flex;
    justify-content: center;
    text-align: center;
  }
}
</style>
