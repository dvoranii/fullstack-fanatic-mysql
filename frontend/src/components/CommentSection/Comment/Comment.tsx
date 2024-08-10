import React, { useContext } from "react";
import {
  CommentWrapper,
  CommentItem,
  CommentContentWrapper,
  //   CommentMeta,
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
import ProfileIcon from "../../../assets/images/profile-icon.png";

const Comment: React.FC<CommentProps> = ({
  comment,
  isEditing,
  editedComment,
  handleEditChange,
  onEdit,
  onDelete,
  onLike,
  onSave,
  onCancelEdit,
}) => {
  const { profile } = useContext(UserContext) || {};
  console.log(profile);

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = ProfileIcon;
  };

  return (
    <CommentWrapper>
      <ProfilePictureWrapper>
        <ProfilePicture
          src={profile?.picture}
          alt={`${profile?.name}`}
          onError={handleImageError}
        />
        <Username>{profile?.name || "Username"}</Username>
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
                  src={comment.likes % 2 === 1 ? like2 : like1}
                  alt="like icon"
                  onClick={onLike}
                />
                {comment.likes}
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
