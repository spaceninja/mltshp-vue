import { NuxtAuthHandler } from '#auth';

export default NuxtAuthHandler({
  // secret needed to run nuxt-auth in production mode (used to encrypt data)
  secret: process.env.NUXT_SECRET,
  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: '/login',
  },
  // @see https://next-auth.js.org/configuration/providers/oauth
  providers: [
    {
      id: 'mltshp',
      name: 'MLTSHP',
      type: 'oauth',
      clientId: process.env.MLTSHP_CLIENT_ID,
      clientSecret: process.env.MLTSHP_CLIENT_SECRET,
      authorization: {
        url: 'https://mltshp.com/api/authorize',
        params: {
          response_type: 'code',
          client_id: process.env.MLTSHP_CLIENT_ID,
        },
      },
      token: {
        url: 'https://mltshp.com/api/token',
        async request(context) {
          const tokens = await getMltshpToken(context);
          return { tokens };
        },
      },
      userinfo: {
        url: 'https://mltshp.com/api/user',
        async request(context) {
          const user = await getMltshpUser(context);
          return user;
        },
      },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          image: profile.profile_image_url,
        };
      },
    },
  ],
  callbacks: {
    async signIn({ profile }) {
      // Only the id, name, and image are saved to the session.
      // To persist the rest of the user info, we can do something with it here.
      console.log('AUTH SIGN IN', profile);
      return true;
    },
  },
});
