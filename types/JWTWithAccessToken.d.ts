import { JWT } from 'next-auth/jwt';

export interface JWTWithAccessToken extends JWT {
  access_token: string;
  secret: string;
}
