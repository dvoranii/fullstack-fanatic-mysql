import { CommentType } from "./Comment";
export interface CommentProps {
  comment: CommentType;
  isEditing: boolean;
  editedComment: string;
  handleEditChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onEdit: () => void;
  onDelete: () => void;
  onLike: () => void;
  onSave: (id: number) => void;
  onCancelEdit: () => void;
}
