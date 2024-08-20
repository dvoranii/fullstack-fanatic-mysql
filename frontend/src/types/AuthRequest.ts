export interface AuthRequestBody {
  email: string;
  name: string;
  password?: string; // Optional, for manual registration
  googleId?: string; // Optional, for Google authentication
}
