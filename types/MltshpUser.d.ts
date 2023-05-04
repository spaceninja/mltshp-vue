import { MltshpShake } from './MltshpShake';

export interface MltshpUser {
  id: number;
  name: string;
  profile_image_url: string;
  about?: string;
  website?: string;
  shakes?: MltshpShake[];
}
