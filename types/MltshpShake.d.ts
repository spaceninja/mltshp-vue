import { AuthUser } from './AuthUser';

export interface MltshpShake {
  id: number;
  name: string;
  owner?: AuthUser;
  url: string;
  thumbnail_url: string;
  description?: string;
  type: string;
  created_at: string;
  updated_at: string;
}
