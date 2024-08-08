import { ContentType } from "./ContentType";
export interface CommentType {
  id: number;
  content_id: number;
  content_type: ContentType;
  content: string;
  created_at: string;
  likes: number;
}
