import { CommentType } from "./Comment";
import { ReactNode } from "react";
export interface CommentProps {
  comment: CommentType;
  isEditing: boolean;
  editedComment: string;
  handleEditChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onEdit: () => void;
  onDelete: () => void;
  onSave: (id: number) => void;
  onCancelEdit: () => void;
  isReply: boolean;
  children?: ReactNode;
}
