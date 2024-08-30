export interface User {
  email: string;
  name: string;
  id: number;
  picture?: string;
  token: string;
  userId: number;
  display_name?: string;
  profession?: string;
  bio?: string;
  social_links?: { [key: string]: string };
  banner_image?: string;
}
