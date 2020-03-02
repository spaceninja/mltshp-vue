<template>
  <div>
    <AppAlert v-if="error" :error="error" />
    <div v-else>
      <!-- eslint-disable vue/no-v-html -->
      <div
        v-if="iframe && iframe.html"
        :style="{
          '--aspect-ratio': iframe.height / iframe.width,
        }"
        v-html="iframe.html"
      ></div>
      <p>
        Source: <a :href="url">{{ url }}</a>
      </p>
    </div>
  </div>
</template>

<script>
import AppAlert from '@/components/AppAlert';

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
      iframe: null,
    };
  },
  async created() {
    const youtubeRegex = /^https?:\/\/(www\.|m\.)?(youtube\.com|youtu\.be)/i;
    const vimeoRegex = /^https?:\/\/(www\.)?vimeo\.com/i;
    const flickrRegex = /^https?:\/\/(www\.)?flickr\.com/i;
    let iframe = {
      html: `<a href="${this.url}">Imagine a video is here. Or click through to see it.</a>`,
    };

    if (this.url.search(youtubeRegex) !== -1) {
      // uses a proxy to avoid CORS issues
      iframe = await this.getOEmbed(`/oembed?url=${this.url}&format=json`);
    }

    if (this.url.search(vimeoRegex) !== -1) {
      iframe = await this.getOEmbed(
        `https://vimeo.com/api/oembed.json?url=${this.url}`
      );
    }

    if (this.url.search(flickrRegex) !== -1) {
      // uses a proxy to avoid CORS issues
      iframe = await this.getOEmbed(
        `/services/oembed?url=${this.url}&format=json`
      );
    }

    // add loading=lazy to iframe code
    iframe.html = iframe.html.replace(/<iframe/gi, '<iframe loading="lazy"');

    this.iframe = iframe;
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

<style lang="scss" scoped></style>
