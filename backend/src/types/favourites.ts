import { ContentType } from "./ContentType";

export interface DeleteFavouriteQuery {
  google_id: string;
  item_id: number;
  user_id: number;
  item_type: ContentType;
}
