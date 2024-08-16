import { ContentType } from "./ContentType";
export interface ContentItem {
  id: number;
  title: string;
  created_at: string;
  isFavourited: boolean;
  image?: string;
  content_type: ContentType;
}
