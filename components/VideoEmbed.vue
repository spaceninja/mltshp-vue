<template>
  <div>
    <AppAlert v-if="error" :name="error.name" :message="error.message" />
    <div v-else>
      <!-- eslint-disable vue/no-v-html -->
      <div
        v-if="oembed && oembed.html"
        :style="`--aspect-ratio: ${oembed.width}/${oembed.height}`"
        v-html="oembed.html"
      ></div>
      <pre>{{ JSON.stringify(oembed, undefined, 2) }}</pre>
      <p>
        Source: <a :href="url">{{ url }}</a>
      </p>
    </div>
  </div>
</template>

<script>
import AppAlert from '@/components/AppAlert';
const youtubeRegex = /^https?:\/\/(www\.|m\.)?(youtube\.com|youtu\.be)/i;
const vimeoRegex = /^https?:\/\/(www\.)?vimeo\.com/i;
const flickrRegex = /^https?:\/\/(www\.)?flickr\.com/i;

export default {
  components: {
    AppAlert,
  },
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      error: null,
    };
  },
  asyncComputed: {
    oembed() {
      let iframe = {
        html: `<a href="${this.url}">Imagine a video is here. Or click through to see it.</a>.`,
      };
      if (this.url.search(youtubeRegex) !== -1) {
        // uses a proxy to avoid CORS issues
        iframe = this.getOEmbed(`/oembed?url=${this.url}&format=json`);
      }
      if (this.url.search(vimeoRegex) !== -1) {
        iframe = this.getOEmbed(
          `https://vimeo.com/api/oembed.json?url=${this.url}`
        );
      }
      if (this.url.search(flickrRegex) !== -1) {
        // uses a proxy to avoid CORS issues
        iframe = this.getOEmbed(`/services/oembed?url=${this.url}&format=json`);
      }
      return iframe;
    },
  },
  methods: {
    getOEmbed(url) {
      return fetch(url, { method: 'GET' })
        .then(response => {
          console.log('OEMBED RESPONSE', response);
          if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
          return response;
        })
        .then(response => response.json())
        .catch(error => (this.error = error));
    },
  },
};
</script>

<style lang="scss" scoped>
// responsive iframes: https://css-tricks.com/responsive-iframes/
[style*='--aspect-ratio'] > :first-child {
  width: 100%;
}
[style*='--aspect-ratio'] > img {
  height: auto;
}
@supports (--custom: property) {
  [style*='--aspect-ratio'] {
    position: relative;
  }
  [style*='--aspect-ratio']::before {
    content: '';
    display: block;
    padding-bottom: calc(100% / (var(--aspect-ratio)));
  }
  [style*='--aspect-ratio'] > :first-child {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
}
</style>
