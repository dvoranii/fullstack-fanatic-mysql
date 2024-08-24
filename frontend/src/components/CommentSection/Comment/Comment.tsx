import React, { useState, useEffect, useContext } from "react";
import {
  CommentWrapper,
  CommentItem,
  CommentContentWrapper,
  CommentActions,
  ProfilePictureWrapper,
  ProfilePicture,
  Username,
  LikesWrapper,
  FormTextArea,
  FormButton,
} from "./Comment.styled";
import { CommentProps } from "../../../types/CommentProps";
import like1 from "../../../assets/images/like-1.png";
import like2 from "../../../assets/images/like-2.png";
import { UserContext } from "../../../context/UserContext";
import { handleImageError } from "../../../utils/imageUtils";
import { toggleLike } from "../../../services/commentService";
import ProfileBackup from "../../../assets/images/profile-icon.png";

const Comment: React.FC<CommentProps> = ({
  comment,
  isEditing,
  editedComment,
  handleEditChange,
  onEdit,
  onDelete,
  onSave,
  onCancelEdit,
}) => {
  const { profile } = useContext(UserContext) || {};
  const [isLiked, setIsLiked] = useState(comment.likedByUser ?? false);
  const [likes, setLikes] = useState(comment.likes);

  useEffect(() => {
    setIsLiked(comment.likedByUser ?? false); // Use nullish coalescing to handle undefined
  }, [comment.likedByUser, profile?.id]);

  const handleLikeClick = async () => {
    try {
      const updatedLikes = await toggleLike(comment.id);
      setLikes(updatedLikes);
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error("Failed to toggle like", error);
    }
  };

  const isCommentOwner = profile && Number(profile?.id) === comment.user_id;

  return (
    <CommentWrapper>
      <ProfilePictureWrapper>
        <ProfilePicture
          src={comment.user_picture || ProfileBackup}
          alt={comment.user_name || "Username"}
          onError={handleImageError}
        />
        <Username>{comment.user_name || "Username"}</Username>
      </ProfilePictureWrapper>
      <CommentItem>
        <CommentContentWrapper>
          {isEditing ? (
            <>
              <FormTextArea value={editedComment} onChange={handleEditChange} />
              <CommentActions>
                <FormButton onClick={() => onSave(comment.id)}>Save</FormButton>
                <FormButton onClick={onCancelEdit}>Cancel</FormButton>
              </CommentActions>
            </>
          ) : (
            <>
              <p>{comment.content}</p>
              <LikesWrapper>
                <img
                  src={isLiked ? like2 : like1}
                  alt="like icon"
                  onClick={handleLikeClick}
                />
                {likes}
              </LikesWrapper>
            </>
          )}
        </CommentContentWrapper>
        {!isEditing && isCommentOwner && (
          <CommentActions>
            <FormButton onClick={onEdit}>Edit</FormButton>
            <FormButton onClick={onDelete}>Delete</FormButton>
          </CommentActions>
        )}
      </CommentItem>
    </CommentWrapper>
  );
};

export default Comment;
