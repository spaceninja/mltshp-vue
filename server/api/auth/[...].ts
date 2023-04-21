import { NuxtAuthHandler } from '#auth';
import { AuthUser } from '~/types/AuthUser';
import { MltshpShake } from '~/types/MltshpShake';

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
        // Reduce the shakes to the info we need for navigation
        const shakes = profile.shakes.map((shake: MltshpShake) => {
          const shakeUrl = new URL(shake.url);
          return {
            id: shake.id,
            name: shake.name,
            path:
              shake.type === 'group'
                ? `/shake${shakeUrl.pathname}`
                : shakeUrl.pathname,
          };
        });
        return {
          id: profile.id,
          name: profile.name,
          fullName: profile.shakes[0].name,
          image: profile.profile_image_url,
          shakes,
          about: profile.about,
          website: profile.website,
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
      // Persist user fields to the JWT for reference in the session
      if (user) {
        const typedUser = user as AuthUser;
        token.about = typedUser.about;
        token.fullName = typedUser.fullName;
        token.shakes = typedUser.shakes;
        token.website = typedUser.website;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user fields to the session's user object
      if (session.user) {
        session.user = {
          about: token.about,
          fullName: token.fullName,
          shakes: token.shakes,
          website: token.website,
          ...session.user,
        } as AuthUser;
      }
      return session;
    },
  },
});
