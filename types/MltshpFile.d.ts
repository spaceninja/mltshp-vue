import { MltshpUser } from './MltshpUser';

export interface MltshpFile {
  sharekey: string;
  name: string;
  user: MltshpUser;
  title?: string;
  description?: string;
  posted_at: string;
  permalink_page: string;
  width: number;
  height: number;
  views: number;
  likes: number;
  saves: number;
  comments: number;
  nsfw: boolean;
  original_image_url?: string;
  url?: string;
  pivot_id: string;
  saved: boolean;
  liked: boolean;
}
