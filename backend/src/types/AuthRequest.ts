export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    google_id: string;
  };
}
