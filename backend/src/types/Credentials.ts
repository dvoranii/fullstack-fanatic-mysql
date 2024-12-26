export interface Credentials {
  refresh_token?: string;
  access_token?: string;
  scope?: string;
  expiry_date?: number;
  token_type?: string;
}
