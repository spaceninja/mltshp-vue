import { User } from 'next-auth';

export interface AuthShake {
  id: number;
  name: string;
  path: string;
  type: string;
}

export interface AuthUser extends User {
  fullName: string;
  shakes: AuthShake[];
  about: string;
  website: string;
}
