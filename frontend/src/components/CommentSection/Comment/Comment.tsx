import { useState, useEffect, useContext } from "react";
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
  ReplyFormWrapper,
  TrashBinButton,
} from "./Comment.styled";
import { CommentProps } from "../../../types/CommentProps";
import like1 from "../../../assets/images/like-1.png";
import like2 from "../../../assets/images/like-2.png";
import { UserContext } from "../../../context/UserContext";
import { handleImageError } from "../../../utils/imageUtils";
import { toggleLike } from "../../../services/commentService";
import ProfileBackup from "../../../assets/images/profile-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { submitReply } from "../../../services/commentService";

const BASE_URL = "http://localhost:5000";

const Comment: React.FC<CommentProps> = ({
  comment,
  isEditing,
  editedComment,
  handleEditChange,
  onEdit,
  onDelete,
  onSave,
  onCancelEdit,
  isReply,
  children,
  ...restProps
}) => {
  const { profile } = useContext(UserContext) || {};
  const [isLiked, setIsLiked] = useState(comment.likedByUser ?? false);
  const [likes, setLikes] = useState(comment.likes);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLiked(comment.likedByUser ?? false);
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

  const handleProfileClick = () => {
    if (Number(profile?.id) === comment.user_id) {
      navigate("/my-account");
    } else {
      navigate(`/user/${comment.user_id}`);
    }
  };

  const handleReply = async () => {
    if (replyContent.trim() === "") return;

    try {
      const newReply = await submitReply({
        content_id: comment.content_id,
        content_type: comment.content_type,
        content: replyContent,
        parent_comment_id: comment.id,
      });
      comment.replies.push(newReply);
      setReplyContent("");
      setShowReplyForm(false);
    } catch (error) {
      console.error("Failed to submit reply", error);
    }
  };

  const profilePictureUrl = comment.profile_picture
    ? `${BASE_URL}${comment.profile_picture}`
    : ProfileBackup;

  return (
    <CommentWrapper isreply={isReply} {...restProps}>
      <ProfilePictureWrapper onClick={handleProfileClick}>
        <Link to={`/user/${comment.user_id}`}>
          <ProfilePicture
            src={profilePictureUrl}
            alt={comment.user_name || "Username"}
            onError={handleImageError}
          />
        </Link>
        <Link to={`/user/${comment.user_id}`}>
          <Username>{comment.user_name || "Username"}</Username>
        </Link>
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

        <CommentActions>
          {!isEditing && isCommentOwner && (
            <>
              <FormButton onClick={onEdit}>Edit</FormButton>
              <FormButton onClick={onDelete}>Delete</FormButton>
            </>
          )}

          {!isEditing && !isCommentOwner && !isReply && !showReplyForm && (
            <FormButton onClick={() => setShowReplyForm(true)}>
              Reply
            </FormButton>
          )}

          {showReplyForm && (
            <ReplyFormWrapper>
              <FormTextArea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "0.5rem",
                }}
              >
                <FormButton onClick={handleReply}>Submit Reply</FormButton>
                <TrashBinButton onClick={() => setShowReplyForm(false)} />
              </div>
            </ReplyFormWrapper>
          )}
        </CommentActions>

        <div style={{ width: "100%" }}>{children}</div>
      </CommentItem>
    </CommentWrapper>
  );
};

export default Comment;
