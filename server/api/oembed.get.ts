/**
 * We fetch the oembed from the server to avoid CORS issues
 */
export default defineEventHandler(async (event) => {
  const { url } = getQuery(event) as { url: string };
  if (!url) throw Error('Missing URL!');

  const encodedUrl = encodeURIComponent(url);
  const youtubeRegex = /^https?:\/\/(www\.|m\.)?(youtube\.com|youtu\.be)/i;
  const vimeoRegex = /^https?:\/\/(www\.)?vimeo\.com/i;
  const flickrRegex = /^https?:\/\/(www\.)?flickr\.com/i;

  let oembedUrl = null;

  if (youtubeRegex.test(url)) {
    oembedUrl = `https://www.youtube.com/oembed?url=${encodedUrl}&format=json`;
  }

  if (vimeoRegex.test(url)) {
    oembedUrl = `https://vimeo.com/api/oembed.json?url=${encodedUrl}`;
  }

  if (flickrRegex.test(url)) {
    oembedUrl = `https://www.flickr.com/services/oembed?url=${encodedUrl}&format=json`;
  }

  if (!oembedUrl)
    return {
      html: `<a href="${url}">Imagine a video is here. Or follow this link to see it.</a>`,
    };

  return fetch(oembedUrl as string).then((response) => {
    if (!response.ok)
      throw createError({
        statusCode: response.status,
        statusMessage: response.statusText,
      });
    return response.json();
  });
});
