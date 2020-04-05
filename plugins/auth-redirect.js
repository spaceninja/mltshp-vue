export default function ({ $auth }) {
  $auth.onRedirect((to, from) => {
    console.warn('[AUTH MODULE REDIRECT]', to);
    // you can optionally change `to` by returning a new value
  });
}
