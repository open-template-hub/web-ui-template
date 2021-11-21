import { Social } from '../social/social.model';

export interface User {
  name: string;
  title: string;
  bio: string;
  photoUri: string;
  social: Social;
}
