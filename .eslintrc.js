module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['airbnb-base', '@nuxt/eslint-config', 'prettier'],
  rules: {
    'no-console': 'off', // TODO: temporary during dev!
    'no-undef': 'off', // conflicts with Vue auto-loaded things like onMounted
  },
};
