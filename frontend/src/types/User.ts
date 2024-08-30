export interface User {
  email: string;
  name: string;
  id: number;
  picture?: string;
  token: string;
  userId: number;
  displayName?: string;
  profession?: string;
  bio?: string;
  socialLinks?: { [key: string]: string };
  banner_image?: string;
}
