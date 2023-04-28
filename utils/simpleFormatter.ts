import linkifyHtml from 'linkify-html';

/**
 * Simple Formatter
 * MLTSHP supports only very simple formatting for user text. Line breaks are
 * converted to HTML and URLs are converted to links. A full markdown library
 * would not only be overkill for this, but it would apply additional formatting
 * that wouldn't match what MLTSHP does.
 */
const simpleFormatter = (string: string) => {
  const paragraphs = string.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
  const linked = linkifyHtml(paragraphs, {
    rel: 'nofollow noopener noreferrer',
    target: '_blank',
  });
  return linked;
};

export default simpleFormatter;
