import { User } from 'next-auth';

interface AuthShake {
  id: number;
  name: string;
  path: string;
}

export interface AuthUser extends User {
  fullName: string;
  shakes: AuthShake[];
  about: string;
  website: string;
}
