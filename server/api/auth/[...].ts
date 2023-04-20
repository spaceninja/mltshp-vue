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
      // 1. Request an authorization code from MLTSHP
      authorization: {
        url: 'https://mltshp.com/api/authorize',
        params: {
          response_type: 'code',
          client_id: process.env.MLTSHP_CLIENT_ID,
        },
      },
      // 2. Use the code to request an access token
      token: {
        url: 'https://mltshp.com/api/token',
        async request(context) {
          const tokens = await getMltshpToken(context);
          return { tokens };
        },
      },
      // 3. Use the token to request the user's info
      userinfo: {
        url: 'https://mltshp.com/api/user',
        async request(context) {
          const user = await getMltshpUser(context);
          return user;
        },
      },
      // 4. Save the user's info to the session
      profile(profile) {
        console.log('FULL NAME', profile.shakes[0]?.name);
        return {
          id: profile.id,
          name: profile.name,
          fullName: profile.shakes[0]?.name,
          image: profile.profile_image_url,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the token to the JWT for use in API calls
      // @see https://next-auth.js.org/configuration/callbacks#jwt-callback
      // @see https://sidebase.io/nuxt-auth/server-side/jwt-access
      if (account) {
        /* eslint-disable no-param-reassign */
        token.access_token = account.access_token;
        token.secret = account.secret;
      }
      // Persist the fullname to the JWT for reference in the session
      if (user) {
        token.fullName = user.fullName;
      }
      return token;
    },
    async session({ session, token }) {
      // Add the fullname to the session's user object
      if (session.user) {
        session.user.fullName = token.fullName;
      }
      return session;
    },
  },
});
