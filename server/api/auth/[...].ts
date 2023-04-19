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
          console.log('TOKEN', tokens);
          return { tokens };
        },
      },
      userinfo: {
        url: 'https://mltshp.com/api/user',
        async request(context) {
          const user = await getMltshpUser(context);
          console.log('USER INFO CONTEXT', context);
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
    async signIn({ account, profile }) {
      // Only the id, name, and image are saved to the session.
      // To persist the rest of the user info, we can do something with it here.
      console.log('ACCOUNT', account);
      console.log('AUTH SIGN IN', profile);
      return true;
    },
    async jwt({ token, account, profile }) {
      console.log('JWT', { token, account, profile });
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.secret = account.secret;
      }
      return token;
    },
  },
});
