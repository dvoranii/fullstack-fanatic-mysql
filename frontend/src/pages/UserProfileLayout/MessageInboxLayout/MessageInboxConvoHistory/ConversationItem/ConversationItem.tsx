import React from "react";
import {
  ConversationWrapper,
  ProfilePictureWrapper,
  ConversationDetailsWrapper,
  SubjectPreview,
  DeleteConvoButtonWrapper,
} from "./ConversationItem.styled";
import ProfilePicture from "../../../../../components/ProfilePicture/ProfilePicture";
import { Conversation } from "../../../../../types/Conversations";

interface ConversationItemProps {
  conversation: Conversation;
  loggedInUserId: number;
  onSelect: (conversationId: number) => void;
  onDelete: (conversationId: number) => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  loggedInUserId,
  onSelect,
  onDelete,
}) => {
  const isUser1 = conversation.user1_id === loggedInUserId;
  const otherUserName = isUser1
    ? conversation.user2_name
    : conversation.user1_name;
  const otherUserPicture = isUser1
    ? conversation.user2_picture
    : conversation.user1_picture;

  const handleSelect = () => {
    onSelect(conversation.id);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(conversation.id);
  };

  return (
    <ConversationWrapper onClick={handleSelect}>
      <ProfilePictureWrapper>
        <ProfilePicture
          src={
            otherUserPicture ||
            "https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/nav/profile-icon-black.png"
          }
          alt="User Profile Picture"
          width="45px"
          border="2px solid #ccc"
          bg="#ffffff"
        />
      </ProfilePictureWrapper>

      <ConversationDetailsWrapper>
        <p>{otherUserName || "Unknown User"}</p>
        <SubjectPreview>{conversation.subject || "No subject"}</SubjectPreview>
      </ConversationDetailsWrapper>

      <DeleteConvoButtonWrapper>
        <button className="delete-button" onClick={handleDelete}>
          <img
            src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/comment/discard-icon.png"
            alt="Delete Conversation"
            title="Delete"
          />
        </button>
      </DeleteConvoButtonWrapper>
    </ConversationWrapper>
  );
};

export default ConversationItem;
