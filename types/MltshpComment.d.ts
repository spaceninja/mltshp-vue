import { MltshpUser } from './MltshpUser';

export interface MltshpComment {
  body: string;
  posted_at: string;
  user: MltshpUser;
}
