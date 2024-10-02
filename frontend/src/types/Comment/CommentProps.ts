import { CommentType } from "./Comment";
import { ReactNode } from "react";
export interface CommentProps {
  comment: CommentType;
  isEditing: boolean;
  editedComment: string;
  handleEditChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onEdit: () => void;
  onDelete: () => void;
  onSave: (id: number, updatedContent: string) => Promise<void>;
  onCancelEdit: () => void;
  isLiked?: boolean;
  isReply: boolean;
  children?: ReactNode;
  onReplySubmit: (
    parentCommentId: number,
    replyContent: string
  ) => Promise<void>;
}
