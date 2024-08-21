import React, { useState, useEffect } from "react";
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
// import { UserContext } from "../../../context/UserContext";
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
  // const { profile } = useContext(UserContext) || {};
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);

  // useEffect(() => {
  //   if (
  //     profile?.userId &&
  //     comment.likedBy &&
  //     comment.likedBy.includes(profile.userId.toString())
  //   ) {
  //     setIsLiked(true);
  //   } else {
  //     setIsLiked(false);
  //   }
  // }, [comment.likedBy, profile?.userId]);
  useEffect(() => {
    if (comment.likedBy && comment.likedBy.includes(String(comment.user_id))) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [comment.likedBy, comment.user_id]);

  const handleLikeClick = async () => {
    try {
      const updatedLikes = await toggleLike(comment.id);
      setLikes(updatedLikes);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Failed to toggle like", error);
    }
  };

  return (
    <CommentWrapper>
      <ProfilePictureWrapper>
        {/* <ProfilePicture
          src={profile?.picture || ProfileBackup}
          alt={profile?.name || "Username"}
          onError={handleImageError}
        /> */}
        {/* <Username>{profile?.name || "Username"}</Username> */}
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
                  src={isLiked ? like2 : like1} // Use isLiked to determine the icon, but need to refactor to be user specific
                  alt="like icon"
                  onClick={handleLikeClick}
                />
                {likes}
              </LikesWrapper>
            </>
          )}
        </CommentContentWrapper>
        {!isEditing && (
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
