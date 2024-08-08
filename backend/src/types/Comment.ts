export interface Comment {
  id: number;
  content_id: number;
  content_type: "tutorial" | "blog";
  content: string;
  created_at: string;
  likes: number;
}
