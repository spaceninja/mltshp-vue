import { User } from 'next-auth';

export interface UserWithFullName extends User {
  fullName: string;
}
