export default function({ $auth }) {
  $auth.onRedirect((to, from) => {
    console.error(to)
    // you can optionally change `to` by returning a new value
  })
}
