import { MltshpUser } from './MltshpUser';

export interface MltshpShake {
  id: number;
  name: string;
  owner?: MltshpUser;
  url: string;
  thumbnail_url?: string;
  description?: string;
  type: string;
  created_at?: string;
  updated_at?: string;
}
